import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopPay – Secure E-commerce & Fintech in Nigeria",
  description:
    "ShopPay is a secure, mobile-first e-commerce and fintech platform in Nigeria. Pay Safe, Shop Free. Escrow-protected transactions, social commerce, airtime and utility payments.",
  icons: {
    icon: "/LOGO-SHOPPAY.jpeg",
    apple: "/LOGO-SHOPPAY.jpeg",
  },
  openGraph: {
    title: "ShopPay – Secure E-commerce & Fintech in Nigeria",
    description: "Pay Safe, Shop Free. Escrow-protected buying and selling in Nigeria.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`} suppressHydrationWarning>
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
