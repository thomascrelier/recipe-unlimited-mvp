import type { Metadata } from "next";
import { Playfair_Display, Crimson_Pro } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Olive Garden | Claude Code Training",
  description:
    "Master Claude Code — Pre-work for your facilitated training session",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${crimsonPro.variable} antialiased`}
      >
        <div className="grain-overlay wood-bg wood-vignette min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
