import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing | FairShare Pro - Simple & Court-Ready",
    description: "Affordable pricing for co-parenting expense tracking. Start for free or upgrade for unlimited invoices, AI scanning, and full history archives.",
};

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
