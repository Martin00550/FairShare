import type { Metadata } from "next";
import { Inter, Playfair_Display, Lato } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavBar } from "@/components/nav-bar";
import { Toaster } from "sonner";
import { AnnouncementBanner } from "@/components/announcement-banner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-lato" });

export const metadata: Metadata = {
  metadataBase: new URL('https://getfairshare.cloud'),
  title: {
    default: "FairShare - Co-Parenting Expense Tracker & Child Support Logs",
    template: "%s | FairShare"
  },
  description: "Stop adding up receipts. Start getting reimbursed. The stress-free way to manage shared expenses and create unilateral child support invoice documentation.",
  keywords: ["co-parenting app", "expense tracker", "child support invoice", "custody expenses", "receipt scanner", "unilateral parenting tools"],
  authors: [{ name: "FairShare" }],
  creator: "FairShare",
  publisher: "FairShare",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://getfairshare.cloud",
    title: "FairShare - Track Co-Parenting Expenses & Generate Invoices",
    description: "The easiest way to track reusable co-parenting expenses. Scan receipts, generate professional PDFs, and keep a perfect audit trail.",
    siteName: "FairShare",
    images: [{
      url: "/og-image.jpg", // We'll need to make sure this exists or use a default
      width: 1200,
      height: 630,
      alt: "FairShare Dashboard Preview"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FairShare - Co-Parenting Expense Tracker",
    description: "Turn your shoebox of receipts into a clear audit trail. Professional invoicing for co-parents.",
    images: ["/og-image.jpg"], // reusing OG image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
          <AnnouncementBanner />
          <NavBar />
          <main className="flex-1 pb-16 md:pb-0">
            {children}
          </main>
          <Toaster richColors position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
