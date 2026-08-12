import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import { Grain } from "@/components/grain";
import { AmbientBackground } from "@/components/ambient-background";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mariam Khan | CS & Data Science",
  description:
    "Mariam Khan, CS & Data Science grad building AI-driven products. Product Specialist @ Apple.",
  openGraph: {
    title: "Mariam Khan",
    description:
      "CS & Data Science grad building AI-driven products. Product Specialist @ Apple.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plexMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AmbientBackground />
        <Grain />
        {children}
      </body>
    </html>
  );
}
