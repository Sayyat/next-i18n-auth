/*
 * Copyright (c) 2025. Sayat Raykul
 */

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/core/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { ClientProvidersWrapper } from "@/core/providers/ClientProvidersWrapper";
import { ReactNode } from "react";
import { getUserLanguage } from "@/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Next i18n Auth",
    template: `%s - Next i18n Auth`,
  },
  metadataBase: new URL("https://github.com/Sayyat/next-i18n-auth"),
  description:
    "A modern boilerplate for building scalable web applications with **Next.js 15**, **TypeScript**, and integrated **i18n** (internationalization). Perfect for developers looking for authentication (Next-Auth), schema validation (Zod), and responsive designs (Tailwind CSS).\n",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Next-Auth",
    "Internationalization",
  ],
  authors: [
    {
      name: "ZIZ INC.",
      url: "https://web.ziz.kz/",
    },
  ],
  creator: "ZIZ INC.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://next-i18n-auth-mu.vercel.app",
    title: "Next i18n Auth",
    description: "Next i18n Auth Boilerplate",
    siteName: "Next i18n Auth",
    images: [
      {
        url: "https://next-i18n-auth-mu.vercel.app/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "Next i18n Auth",
      },
    ],
  },
  generator: "Next js",
  icons: {
    icon: "/assets/android-chrome-192x192.png",
    shortcut: "/assets/android-chrome-512x512.png",
    apple: "/assets/apple-touch-icon.png",
  },
  manifest: "https://next-i18n-auth-mu.vercel.app/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  colorScheme: "dark light",
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const lang = await getUserLanguage();

  return (
    <html lang={lang}>
      <head>
        <title>Next i18n Auth</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvidersWrapper>
          {children}
          <ToastContainer
            limit={3}
            toastClassName={
              "font-bold bg-accent text-accent-foreground flex items-center p-4 z-1002"
            }
          />
        </ClientProvidersWrapper>
      </body>
    </html>
  );
}
