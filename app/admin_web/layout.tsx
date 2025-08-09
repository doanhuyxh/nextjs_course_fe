'use client';
import '@/styles/admin_web.css';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AdminSideBar } from '@/components/Sidebar';
import AdminHeader from '@/components/Header/AdminWeb';
import Loading from '@/components/Loading';
import { Toaster } from 'react-hot-toast';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { createCache } from '@/libs/antd-style-cache';
import '@ant-design/v5-patch-for-react-19';
import 'dayjs/locale/vi';
import dayjs from "dayjs";
import viVN from 'antd/locale/vi_VN';
dayjs.locale('vi');

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [cache] = React.useState(() => createCache());
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const userJson = localStorage.getItem("user") ?? "{}";
    const userExists = userJson !== "{}";

    if (!userExists) {
      router.push('/admin_web/auth/login');
    }
  }, [pathname, router]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loading />
  }

  if (pathname.includes("admin_web/auth")) {
    return (
      <>
        {children}
      </>
    )
  }

  return (
    <ConfigProvider locale={viVN}>
      <StyleProvider cache={cache}>
        <div className="bg-gray-200">
          <div className='flex h-screen overflow-hidden'>
            <AdminSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              <main className="">
                <div className="mx-auto p-4 md:p-6 2xl:p-10 ">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Toaster />
        </div>
      </StyleProvider>
    </ConfigProvider>
  );
}
