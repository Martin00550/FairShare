"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface PaddleEvent {
    name: string;
    data: any;
}

interface CheckoutOptions {
    items: { priceId: string; quantity: number }[];
    customer?: {
        email?: string;
    };
    customData?: Record<string, any>;
    settings?: {
        successUrl: string;
        displayMode: "overlay" | "inline";
    };
}

interface PaddleContextType {
    isLoaded: boolean;
    openCheckout: (options: CheckoutOptions) => void;
}

const PaddleContext = createContext<PaddleContextType | undefined>(undefined);

export function PaddleProvider({ children }: { children: ReactNode }) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // @ts-ignore
        if (window.Paddle) {
            setIsLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
        script.async = true;

        script.onload = () => {
            // @ts-ignore
            if (window.Paddle) {
                const environment = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || "sandbox";
                // @ts-ignore
                window.Paddle.Environment.set(environment as "sandbox" | "production");

                const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
                if (clientToken) {
                    // @ts-ignore
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
        };
    }, []);

    const openCheckout = (options: CheckoutOptions) => {
        // @ts-ignore
        if (window.Paddle) {
            // @ts-ignore
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

export const usePaddle = () => {
    const context = useContext(PaddleContext);
    if (context === undefined) {
        throw new Error("usePaddle must be used within a PaddleProvider");
    }
    return context;
};
