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
  title: "App",
  description: "A NextJS app template.",
};

export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'ar' }]
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: 'en-US' | 'ar' }
}) {
  return (
    <html lang={params.lang} className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
