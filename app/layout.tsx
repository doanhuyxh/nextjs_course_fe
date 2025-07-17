import type { Metadata } from "next";
import { Inder } from "next/font/google";
import "@/styles/globals.css";

const inder = Inder({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-inder",
});

export const metadata: Metadata = {
  title: "Study Flash Bot",
  description: "Chốt đơn thần tốc với Study Flash Bot - Trợ lý học tập AI giúp bạn chốt đơn nhanh chóng.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
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
        className={`${inder.variable} ${inder.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}