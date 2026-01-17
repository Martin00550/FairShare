import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ============================================================
// RATE LIMITING - Using Upstash Redis for serverless support
// ============================================================

// Check if Upstash is configured
const isUpstashConfigured =
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN;

// Create rate limiter only if Upstash is configured
const ratelimit = isUpstashConfigured
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(100, "1 m"), // 100 requests per minute
        analytics: true,
        prefix: "fairshare_ratelimit",
    })
    : null;

// Fallback in-memory rate limiter (for development without Upstash)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 100;

function fallbackRateLimit(key: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(key);

    if (rateLimitMap.size > 10000) {
        for (const [k, v] of rateLimitMap.entries()) {
            if (v.resetTime < now) rateLimitMap.delete(k);
        }
    }

    if (!record || record.resetTime < now) {
        rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    record.count++;
    return record.count > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    return forwarded ? forwarded.split(",")[0].trim() : realIp || "unknown";
}

// Define which routes need authentication
const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/expenses(.*)',
    '/invoices(.*)',
    '/profile(.*)',
    '/admin(.*)',
]);

// Define API routes that need rate limiting
const isApiRoute = createRouteMatcher([
    '/api/(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    // Apply rate limiting to API routes
    if (isApiRoute(req)) {
        const ip = getClientIp(req);

        let isLimited = false;
        let retryAfter = 60;

        if (ratelimit) {
            // Use Upstash Redis rate limiting (production)
            const { success, reset } = await ratelimit.limit(ip);
            isLimited = !success;
            retryAfter = Math.ceil((reset - Date.now()) / 1000);
        } else {
            // Use fallback in-memory rate limiting (development)
            isLimited = fallbackRateLimit(ip);
        }

        if (isLimited) {
            return new NextResponse(
                JSON.stringify({ error: "Too many requests. Please try again later." }),
                {
                    status: 429,
                    headers: {
                        "Content-Type": "application/json",
                        "Retry-After": String(retryAfter),
                        "X-RateLimit-Limit": "100",
                    }
                }
            );
        }
    }

    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
