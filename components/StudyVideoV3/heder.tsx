"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Crown } from "lucide-react"
import { UserOutlined, SettingOutlined, HistoryOutlined, LogoutOutlined } from "@ant-design/icons";
import { Customer } from "@/libs/types"
import fetchData from "@/libs/configs/ApiConfig/fetchDataServer"
import { useSearchParams, usePathname } from "next/navigation"
import { useIsMobile } from "@/libs/hooks/use-mobile"
import { Dropdown, Drawer } from "antd";
import type { MenuProps } from 'antd';

const DesktopMenu = ({ user, userName, items }: { user: Customer, userName: string, items: MenuProps['items'] }) => {
    return (
        <nav className="flex items-center gap-6 text-sm font-medium text-[#6b7280]">
            <Link href="#" className="flex items-center gap-2 hover:text-[#111827]">
                <Image src="/images_v2/ring_notify.svg" alt="notification" width={20} height={20} />
            </Link>
            <Link href="https://www.facebook.com/flashbot247" className="flex items-center gap-2 hover:text-[#111827]">
                <Image src="/images_v2/icon_facebook.svg" alt="facebook" width={20} height={20} />
                Fanpage
            </Link>
            <Link href="https://www.facebook.com/messages/t/541293975723906" className="flex items-center gap-2 hover:text-[#111827]">
                <Image src="/images_v2/icon_suport.svg" alt="support" width={20} height={20} />
                Support
            </Link>
            {user.type !== "premium" && (
                <Link
                    href="https://flashbot.vn/">
                    <Button className="bg-[linear-gradient(90deg,_#2563EB_0%,_#9333EA_100%)] hover:bg-opacity-85 text-white rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2">
                        <Crown className="w-4 h-4" />
                        Nâng cấp
                    </Button>
                </Link>
            )}
            <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                <div className="flex items-center gap-2 cursor-pointer hover:text-[#111827]">
                    <div className="bg-green-500 rounded-lg p-1 flex items-center justify-center">
                        <Image src={user?.avatar || '/images_v2/icon_user.svg'} width={24} height={24} alt="" />
                    </div>
                    <span className="text-sm font-medium">{userName}</span>
                </div>
            </Dropdown>
        </nav>
    )
}



const MobileDrawer = ({ user, openDrawer, setOpenDrawer, handleLogout }: {
    user: Customer,
    openDrawer: boolean,
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>,
    handleLogout: () => void
}) => {
    return (
        <>
            <Button
                onClick={() => setOpenDrawer(true)}
                className="!bg-transparent text-white rounded-full px-4 py-2 text-sm"
            >
                <Image src="/images_v2/icon_menu.svg" alt="menu" width={24} height={24} />
            </Button>
            <Drawer
                placement="right"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
                width="80%"
            >
                <div className="flex flex-col gap-2">
                    <Link href="#" className="flex items-center gap-3 text-[16px] text-[#1e293b] text-base">
                        <Image src="/images_v2/ring_notify.svg" alt="noti" width={20} height={20} />
                        Notifications
                    </Link>
                    <Link href="https://www.facebook.com/flashbot247" className="flex items-center gap-3 text-[16px] text-[#1e293b] text-base">
                        <Image src="/images_v2/icon_facebook.svg" alt="facebook" width={20} height={20} />
                        Fanpage
                    </Link>
                    <a href="https://www.facebook.com/messages/t/541293975723906" className="flex items-center gap-3 text-[16px] text-[#1e293b] text-base">
                        <Image src="/images_v2/icon_suport.svg" alt="support" width={20} height={20} />
                        Support
                    </a>

                    {user.type !== "premium" && (
                        <Link
                            href="https://flashbot.vn/"
                            className="w-full bg-gradient-to-r from-[#2563EB] to-[#9333EA] text-white text-base rounded-lg px-2 py-2 text-sm font-medium flex items-center justify-start gap-2"
                        >
                            <Crown className="w-4 h-4" />
                            Nâng cấp
                        </Link>
                    )}

                    <Link href="#" className="flex items-center gap-3 text-[16px] text-[#1e293b] text-base">
                        <UserOutlined />
                        Hồ sơ của tôi
                    </Link>
                    <Link href="#" className="flex items-center gap-3 text-[16px] text-[#1e293b] text-base">
                        <SettingOutlined />
                        Cài đặt
                    </Link>
                    <Link href="#" className="flex items-center gap-3 text-[16px] text-[#1e293b] text-base">
                        <HistoryOutlined />
                        Lịch sử
                    </Link>

                    <button onClick={handleLogout} className="flex items-center gap-3 text-[16px] text-red-500 text-base">
                        <LogoutOutlined />
                        Đăng xuất
                    </button>
                </div>
            </Drawer>
        </>
    );
};



export default function HeaderStudyVideoV3() {
    const pathname = useSearchParams();
    const path = usePathname();
    const [user, setUser] = React.useState<Customer>({} as Customer);
    const isMobile = useIsMobile();
    const [isClient, setIsClient] = React.useState(false);
    const [openDrawer, setOpenDrawer] = React.useState(false);


    const userName = user?.firstName + " " + user?.lastName || user?.email;
    const handleLogout = () => {
        localStorage.clear();
        location.href = "/";
    };
    const items: MenuProps["items"] = [
        {
            key: "profile",
            icon: <UserOutlined />,
            label: <Link href="#">Hồ sơ của tôi</Link>,
        },
        {
            key: "settings",
            icon: <SettingOutlined />,
            label: <Link href="#">Cài đặt</Link>,
        },
        {
            key: "history",
            icon: <HistoryOutlined />,
            label: <Link href="#">Lịch sử</Link>,
        },
        {
            type: "divider",
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: (
                <span onClick={handleLogout} className="text-red-500">
                    Đăng xuất
                </span>
            ),
        },
    ];


    React.useEffect(() => {
        const accessToken = localStorage.getItem("AccessToken");
        fetchData("/customer/get-info", accessToken || "")
            .then((res: any) => {
                const code = res.code;
                if (code === 200) {
                    setUser(res.data);
                    sessionStorage.setItem("user", JSON.stringify(res.data));
                }
            });
    }, [path, pathname]);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <header className={`${isMobile ? "  border-b border-[rgba(30,41,59,0.5)] bg-[rgba(15,23,42,0.95)] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-lg" : "bg-white"} shadow-sm py-3 px-6 flex items-center justify-between sticky top-0 z-10`}>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Image src="/images_v2/img_svg.svg" width={32} height={32} alt="FlashBot Logo" />
                    <span className={`font-bold text-lg ${isMobile ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600" : "text-[#111827]"}`}>FlashBot</span>
                </div>
                <Button className="lg:bg-[#3b82f6] lg:hover:bg-[#2563eb] bg-[linear-gradient(90deg,#3B82F6_0%,#8B5CF6_100%)] text-white rounded-full lg:px-4 !py-3 lg:text-sm lg:font-medium !text-[12px] font-normal h-[14px] flex items-center gap-2 leading-[20px]">
                    Trung tâm học tập
                </Button>
            </div>
            {!isMobile && <DesktopMenu user={user} userName={userName} items={items} />}
            {isMobile && (
                <MobileDrawer
                    user={user}
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                    handleLogout={handleLogout}
                />
            )}

        </header>
    )
}