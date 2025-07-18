"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Crown } from "lucide-react"
import { Customer } from "@/libs/types"
import fetchData from "@/libs/configs/ApiConfig/fetchDataServer"
import { useSearchParams, usePathname } from "next/navigation"
import { Avatar, Typography, Space, Dropdown, MenuProps } from 'antd';


export default function HeaderStudyVideoV3() {
    const pathname = useSearchParams();
    const path = usePathname();
    const [user, setUser] = React.useState<Customer>({} as Customer);

    React.useEffect(() => {
        const accessToken = localStorage.getItem("AccessToken");
        fetchData("/customer/get-info", accessToken || "")
            .then((res: any) => {
                const code = res.code;
                if (code === 200) {
                    setUser(res.data);
                    console.log("User data:", res.data);
                    sessionStorage.setItem("user", JSON.stringify(res.data));
                }
            });
    }, [path, pathname]);

    return (
        <header className="bg-white shadow-sm py-3 px-6 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Image src="/images_v2/img_svg.svg" width={32} height={32} alt="FlashBot Logo" />
                    <span className="font-bold text-lg text-[#111827]">FlashBot</span>
                </div>
                <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-full px-4 py-2 text-sm font-medium">
                    Trung tâm học tập
                </Button>
            </div>
            <nav className="flex items-center gap-6 text-sm font-medium text-[#6b7280]">
                <Link href="#" className="flex items-center gap-2 hover:text-[#111827]">
                    <Image src="/images_v2/ring_notify.svg" alt="notification" width={20} height={20} />
                </Link>
                <Link href="#" className="flex items-center gap-2 hover:text-[#111827]">
                    <Image src="/images_v2/icon_facebook.svg" alt="facebook" width={20} height={20} />
                    Fanpage
                </Link>
                <Link href="#" className="flex items-center gap-2 hover:text-[#111827]">
                    <Image src="/images_v2/icon_suport.svg" alt="support" width={20} height={20} />
                    Support
                </Link>
                {user.type != "premium" &&
                    <Button className="bg-[linear-gradient(90deg,_#2563EB_0%,_#9333EA_100%)] hover:bg-opacity-85 text-white rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2">
                        <Crown className="w-4 h-4" />
                        Nâng cấp
                    </Button>}
                <Link href="#" className="flex items-center gap-2 hover:text-[#111827]">
                    <div className="bg-green-500 rounded-lg p-1 flex items-center justify-center">
                        <Image
                            src={user?.avatar || '/images_v2/icon_user.svg'}
                            width={24}
                            height={24}
                            alt=""
                        />
                    </div>
                    {user?.firstName + " " + user?.lastName || user?.email}
                </Link>
            </nav>
        </header>
    )
}