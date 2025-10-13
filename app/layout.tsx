import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";

export const metadata: Metadata = {
  title: "Sam Adekunle - Portfolio",
  description: "Designer working at the intersection of product, brand and development.",
  openGraph: {
    title: "Sam Adekunle - Portfolio",
    description: "Designer working at the intersection of product, brand and development.",
    url: "https://www.thesamadekunle.com",
    siteName: "Sam Adekunle Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam Adekunle - Portfolio",
    description: "Designer working at the intersection of product, brand and development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

