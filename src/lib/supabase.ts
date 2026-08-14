import { createClient, SupabaseClient } from "@supabase/supabase-js";

const mockData = new Proxy([], {
    get(target: any, prop: any) {
        if (prop === "id") {
            return "mock-id";
        }
        if (prop in target) {
            return target[prop];
        }
        return undefined;
    }
});

const makeRecursiveProxy = (): any => {
    const targetFn = (...args: any[]) => makeRecursiveProxy();

    (targetFn as any).then = (resolve: any) => resolve({
        data: mockData,
        error: null,
        count: 0,
        publicUrl: "https://mock-url.pdf"
    });

    return new Proxy(targetFn, {
        get(t, p) {
            if (p === "then") {
                return t.then;
            }
            if (p === "publicUrl") {
                return "https://mock-url.pdf";
            }
            return makeRecursiveProxy();
        }
    });
};

// Dynamic Proxy-based mock client to handle any chain of database/auth/rpc/storage calls
const mockClient = new Proxy({}, {
    get(target, prop) {
        if (prop === "auth") {
            return {
                getUser: async () => ({ data: { user: null }, error: null }),
                signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
                signUp: async () => ({ data: { user: null, session: null }, error: null }),
                signOut: async () => ({ error: null }),
            };
        }
        return makeRecursiveProxy();
    }
}) as unknown as SupabaseClient;

export function getSupabaseClient(isServer = false) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = isServer
        ? (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
        : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return mockClient;
    }

    return createClient(supabaseUrl, supabaseKey);
}

export const supabase = getSupabaseClient(false);
export const supabaseAdmin = getSupabaseClient(true);
