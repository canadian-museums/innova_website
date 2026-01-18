import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
