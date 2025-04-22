import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Streem",
  description: "Streem your 400 ELS Progress!",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Streem",
    description: "Streem your 400 ELS Progress!",
    images: [
      {
        url: "http://streemid.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "Streem Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@remoteworkerid",
    title: "Streem your 400 ELS Progress!",
    description: "Join Streem and track your 400 ELS Progress with ease and style!",
    images:  [
      {
        url: "http://streemid.netlify.app/og.png",
        width: 1200,
        height: 630,
        alt: "Streem your 400 ELS Progress!",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
