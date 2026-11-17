import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/Manrope-Variable.ttf",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Можно",
  description: "Учебный прототип «Можно» с помощницей Кэи",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ru" className={manrope.variable}><body>{children}</body></html>;
}
