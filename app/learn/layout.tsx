"use client";
import { ConfigProvider } from 'antd';
import { SidebarProvider } from "@/components/ui/sidebar"
import '@ant-design/v5-patch-for-react-19';

import Header from "@/components/Header/CustomerKhanhHung";
import AppSidebar from "@/components/Sidebar/Customer";

export default function LearnLayout({ children }: { children: React.ReactNode }) {

  return (
    <ConfigProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <Header />
          {children}
        </main>
      </SidebarProvider>
    </ConfigProvider>
  );
}
