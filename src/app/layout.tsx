import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/lib/theme";
import { I18nProvider } from "@/lib/i18n";
import { Analytics } from "@/components/shared/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIToolsHub â€” Discover the Best AI Tools, Curated & Ranked",
  description:
    "Explore 100,000+ AI tools across 50+ categories. Compare features, read verified reviews, and find the perfect AI solution for your workflow. Trusted by 2M+ creators worldwide.",
  keywords: [
    "AI tools",
    "AI directory",
    "AI software",
    "ChatGPT",
    "Midjourney",
    "Claude",
    "AI tools directory",
    "best AI tools",
    "AI comparison",
    "AI reviews",
  ],
  authors: [{ name: "AIToolsHub Team" }],
  openGraph: {
    title: "AIToolsHub â€” Discover the Best AI Tools",
    description: "Explore 100,000+ AI tools across 50+ categories. Compare, review, and find your perfect AI stack.",
    siteName: "AIToolsHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIToolsHub â€” Discover the Best AI Tools",
    description: "Explore 100,000+ AI tools across 50+ categories.",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ar: "/ar",
      es: "/es",
      zh: "/zh",
      hi: "/hi",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AIToolsHub",
              description: "Discover the Best AI Tools, Curated & Ranked",
              potentialAction: {
                "@type": "SearchAction",
                target: "/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <I18nProvider>
            {children}
            <Toaster />
            <SonnerToaster position="top-right" richColors />
                      <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} clarityId={process.env.NEXT_PUBLIC_CLARITY_ID} gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
