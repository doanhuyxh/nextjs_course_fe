
import HeaderStudy from "@/components/Header/Study";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Learn with Study Flash Bot",
  description: "Hướng dẫn đến việc học tập hiệu quả với Study Flash Bot - Trợ lý học tập AI giúp bạn chốt đơn nhanh chóng.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderStudy />
      <div className="w-full h-full overflow-y-auto">
        {children}
      </div>
    </>
  );
}
