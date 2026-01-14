"use client";

import { useEffect, createContext, useContext, useState, ReactNode } from "react";

// Paddle types for TypeScript
declare global {
    interface Window {
        Paddle?: {
            Environment: {
                set: (env: "sandbox" | "production") => void;
            };
            Initialize: (options: { token: string; eventCallback?: (event: PaddleEvent) => void }) => void;
            Checkout: {
                open: (options: CheckoutOptions) => void;
            };
        };
    }
}

interface PaddleEvent {
    name: string;
    data?: Record<string, unknown>;
}

interface CheckoutOptions {
    items: Array<{ priceId: string; quantity: number }>;
    customer?: {
        email?: string;
    };
    customData?: Record<string, string>;
    settings?: {
        successUrl?: string;
        displayMode?: "overlay" | "inline";
    };
}

interface PaddleContextType {
    isLoaded: boolean;
    openCheckout: (options: CheckoutOptions) => void;
}

const PaddleContext = createContext<PaddleContextType>({
    isLoaded: false,
    openCheckout: () => console.warn("Paddle not loaded yet"),
});

export function usePaddle() {
    return useContext(PaddleContext);
}

export function PaddleProvider({ children }: { children: ReactNode }) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Don't load if already loaded
        if (window.Paddle) {
            setIsLoaded(true);
            return;
        }

        // Load Paddle.js script
        const script = document.createElement("script");
        script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
        script.async = true;

        script.onload = () => {
            if (window.Paddle) {
                // Set environment to sandbox
                const environment = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || "sandbox";
                window.Paddle.Environment.set(environment as "sandbox" | "production");

                // Initialize with client token
                const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
                if (clientToken) {
                    window.Paddle.Initialize({
                        token: clientToken,
                        eventCallback: (event: PaddleEvent) => {
                            console.log("Paddle event:", event.name, event.data);
                        },
                    });
                    setIsLoaded(true);
                    console.log("Paddle initialized in", environment, "mode");
                } else {
                    console.warn("NEXT_PUBLIC_PADDLE_CLIENT_TOKEN not set");
                }
            }
        };

        script.onerror = () => {
            console.error("Failed to load Paddle.js");
        };

        document.head.appendChild(script);

        return () => {
            // Cleanup is tricky with Paddle, so we leave it
        };
    }, []);

    const openCheckout = (options: CheckoutOptions) => {
        if (window.Paddle) {
            window.Paddle.Checkout.open(options);
        } else {
            console.error("Paddle not initialized");
        }
    };

    return (
        <PaddleContext.Provider value={{ isLoaded, openCheckout }}>
            {children}
        </PaddleContext.Provider>
    );
}
