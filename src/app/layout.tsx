import type { Metadata } from "next";
import { Inter, Playfair_Display, Lato } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavBar } from "@/components/nav-bar";
import { PaddleProvider } from "@/components/paddle-provider";
import { Toaster } from "sonner";
import { AnnouncementBanner } from "@/components/announcement-banner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-lato" });

export const metadata: Metadata = {
  title: "FairShare - Empowering Co-Parenting",
  description: "Stop adding up receipts. Start getting reimbursed. The stress-free way to manage shared expenses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#4f46e5', // indigo-600
          colorBackground: '#fafaf9', // stone-50
          colorText: '#1c1917', // stone-900
          colorTextSecondary: '#57534e', // stone-600
          colorInputBackground: '#ffffff',
          colorInputText: '#1c1917',
          borderRadius: '0.75rem',
        },
        elements: {
          card: 'shadow-xl rounded-2xl border border-slate-200/80',
          headerTitle: 'text-2xl font-bold',
          headerSubtitle: 'text-slate-600',
          formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all',
          formFieldInput: 'rounded-xl border-slate-200 focus:border-indigo-400 focus:ring-indigo-400',
          formFieldLabel: 'text-slate-700 font-medium',
          footerActionLink: 'text-indigo-600 hover:text-indigo-700 font-semibold',
          identityPreviewEditButton: 'text-indigo-600',
          userButtonPopoverCard: 'shadow-xl rounded-2xl border border-slate-200',
          userButtonPopoverActionButton: 'hover:bg-slate-50',
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning className={cn(
          inter.variable,
          playfair.variable,
          lato.variable,
          "font-sans bg-stone-50 text-slate-900 antialiased min-h-screen flex flex-col"
        )}>
          <PaddleProvider>
            <AnnouncementBanner />
            <NavBar />
            <main className="flex-1 pb-16 md:pb-0">
              {children}
            </main>
            <Toaster richColors position="bottom-right" />
          </PaddleProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
