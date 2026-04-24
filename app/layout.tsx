import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mehndinest.in"),
  title: "Mehndi Nest — Premium Mehndi Artistry",
  description:
    "Experience luxury mehndi artistry. Browse our cinematic portfolio, explore design styles, and book your bridal mehndi consultation.",
  keywords: [
    "mehndi",
    "henna",
    "bridal mehndi",
    "wedding mehndi artist",
    "mehndi design",
    "henna artist",
  ],
  alternates: {
    canonical: "https://mehndinest.in",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Mehndi Nest — Premium Mehndi Artistry",
    description:
      "Experience luxury mehndi artistry. Browse our cinematic portfolio, explore design styles, and book your bridal mehndi consultation.",
    url: "https://mehndinest.in",
    siteName: "Mehndi Nest",
    images: [
      {
        url: "/all logo/main logo.webp",
        width: 1200,
        height: 630,
        alt: "Mehndi Nest Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

import LoadingScreen from "@/components/ui/LoadingScreen";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/all logo/favicon-logo.webp" sizes="any" />
      </head>
      <body>
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
