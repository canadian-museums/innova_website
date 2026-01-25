import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Innova Museums | Global Cultural Systems Institution",
  description: "Innova Museums is a global institution dedicated to the architecture of cultural ecosystems. We design and operate integrated systems that unify access, intelligence, inclusion, and long-term sustainability.",
  keywords: ["Innova Museums", "Cultural Systems", "Museum Infrastructure", "Cultural Technology", "Digital Transformation", "Accessibility", "Kanata the Bear", "mAIseums", "Canadian Museums"],
  authors: [{ name: "Innova Museums" }],
  icons: {
    icon: "/innova-icon.jpg",
  },
  openGraph: {
    title: "Innova Museums | Global Cultural Systems Institution",
    description: "We design, build, and operate the systems that allow culture to function, scale, and endure.",
    url: "https://maiseums.com",
    siteName: "Innova Museums",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Innova Museums | Global Cultural Systems Institution",
    description: "We design, build, and operate the systems that allow culture to function, scale, and endure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
