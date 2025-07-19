import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Study Flash Bot",
  description: "Chốt đơn thần tốc với Study Flash Bot - Trợ lý học tập AI giúp bạn chốt đơn nhanh chóng.",
  icons: {
    icon: "https://study-api.flashbot.vn/upload/image/638885115064360671.png",
    apple: "https://study-api.flashbot.vn/upload/image/638885115064360671.png",
    shortcut: "https://study-api.flashbot.vn/upload/image/638885115064360671.png",
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
        className={`${inter.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}