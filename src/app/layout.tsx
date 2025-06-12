import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getNavigation } from "@/utils/mdx";
import Layout from "@/components/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DIY 3-Axis CNC Plotter Using DC Motors with Optical Encoders",
  description: "Learn how to build a 3-axis CNC plotter using DC motors with optical encoders, powered by JLCPCB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = getNavigation();
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout navigation={navigation}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
