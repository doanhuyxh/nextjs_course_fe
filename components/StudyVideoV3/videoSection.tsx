
import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Check, FileText, HelpCircle, Users } from "lucide-react"



export default function VideoSectionV3() {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 col-span-1 lg:col-span-2">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                <Image
                    src="/placeholder.svg?height=225&width=400"
                    width={800}
                    height={450}
                    alt="Video Thumbnail"
                    className="object-cover w-full h-full"
                />
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute w-16 h-16 rounded-full bg-red-600/80 text-white hover:bg-red-600"
                >
                    <Play className="w-8 h-8 fill-current" />
                    <span className="sr-only">Play video</span>
                </Button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-[#6b7280]">
                <span className="bg-[#dcfce7] text-[#15803d] px-2 py-1 rounded-full font-medium">Người mới bắt đầu</span>
                <span>5:30</span>
            </div>
            <h1 className="text-2xl font-bold text-[#111827] mt-2">Cách kết nối với Fanpage</h1>
            <p className="text-[#4b5563] mt-2 leading-relaxed">
                Tìm hiểu những điều cơ bản và cách tạo tài khoản FlashBot và bắt đầu sử dụng nền tảng của chúng tôi.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
                <Button className="bg-[#ecfdf5] text-[#047857] hover:bg-[#d1fae5] rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Hoàn thành
                </Button>
                <Button
                    variant="outline"
                    className="rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 text-[#4b5563] border-[#e2e8f0] hover:bg-[#f3f4f6] bg-transparent"
                >
                    <FileText className="w-4 h-4" />
                    Ghi chú (0)
                </Button>
                <Button
                    variant="outline"
                    className="rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 text-[#4b5563] border-[#e2e8f0] hover:bg-[#f3f4f6] bg-transparent"
                >
                    <HelpCircle className="w-4 h-4" />
                    Nhận giúp đỡ
                </Button>
                <Button
                    variant="outline"
                    className="rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 text-[#4b5563] border-[#e2e8f0] hover:bg-[#f3f4f6] bg-transparent"
                >
                    <Users className="w-4 h-4" />
                    Cộng đồng
                </Button>
            </div>
        </div>
    )
}