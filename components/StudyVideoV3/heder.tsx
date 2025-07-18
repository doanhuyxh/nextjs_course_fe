

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bell, Facebook, LifeBuoy, Crown, User } from "lucide-react"



export default function HeaderStudyVideoV3() {
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
                    <Bell className="w-4 h-4" />
                    Thông báo
                </Link>
                <Link href="#" className="flex items-center gap-2 hover:text-[#111827]">
                    <Facebook className="w-4 h-4" />
                    Fanpage
                </Link>
                <Link href="#" className="flex items-center gap-2 hover:text-[#111827]">
                    <LifeBuoy className="w-4 h-4" />
                    Support
                </Link>
                <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Nâng cấp
                </Button>
                <Link href="#" className="flex items-center gap-2 hover:text-[#111827]">
                    <User className="w-4 h-4" />
                    Thế Anh
                </Link>
            </nav>
        </header>
    )
}