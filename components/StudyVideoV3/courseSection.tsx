import Image from "next/image"
import { ChevronDown, ChevronRight, Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { Progress } from "@/components/ui/progress"


export default function CourseSection() {

    return (
        <Card className="bg-white rounded-lg shadow-md p-6 col-span-1 lg:col-span-1">
            <CardHeader className="p-0 pb-4 flex flex-row items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#7e22ce]" />
                <CardTitle className="text-lg font-bold text-[#111827]">Course Playlist</CardTitle>
            </CardHeader>
            <CardContent className="p-0 grid gap-4">
                {/* Free Section */}
                <div className="bg-[#eff6ff] rounded-lg p-4">
                    <div className="flex items-center justify-between text-sm font-medium text-[#1d4ed8]">
                        <div className="flex items-center gap-2">
                            <ChevronDown className="w-4 h-4" />
                            <span>Free</span>
                        </div>
                        <span>(3 videos)</span>
                    </div>
                    <Progress value={33} className="w-full h-2 mt-2 bg-[#bfdbfe]" />
                    <div className="text-xs text-[#6b7280] mt-1">1/3</div>
                    <div className="mt-4 grid gap-3">
                        
                        <div className="flex items-center gap-3">
                            <Image
                                src="/placeholder.svg?height=48&width=80"
                                width={80}
                                height={48}
                                alt="Lesson Thumbnail"
                                className="rounded-md object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-[#111827]">Cách đăng ký tài khoản FlashBot</h3>
                                <p className="text-xs text-[#6b7280]">
                                    5:30 <span className="text-[#15803d]">Người mới bắt đầu</span>
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <Image
                                src="/placeholder.svg?height=48&width=80"
                                width={80}
                                height={48}
                                alt="Lesson Thumbnail"
                                className="rounded-md object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-[#111827]">Cách tạo chatbot đầu tiên của bạn</h3>
                                <p className="text-xs text-[#6b7280]">
                                    8:45 <span className="text-[#15803d]">Người mới bắt đầu</span>
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <Image
                                src="/placeholder.svg?height=48&width=80"
                                width={80}
                                height={48}
                                alt="Lesson Thumbnail"
                                className="rounded-md object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-[#111827]">Cách kết nối Fanpage</h3>
                                <p className="text-xs text-[#6b7280]">
                                    6:20 <span className="text-[#15803d]">Người mới bắt đầu</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Locked Sections */}
                <div className="grid gap-3">
                    <div className="bg-white rounded-lg p-4 flex items-center justify-between border border-[#e2e8f0]">
                        <div className="flex items-center gap-2 text-sm font-medium text-[#4b5563]">
                            <ChevronRight className="w-4 h-4" />
                            <span className="bg-[linear-gradient(90deg,#3B82F6_0%,#06B6D4_100%)] text-white px-2 py-1 rounded-full">Basic</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                            <Lock className="w-4 h-4" />
                            <span>0/3</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 flex items-center justify-between border border-[#e2e8f0]">
                        <div className="flex items-center gap-2 text-sm font-medium text-[#4b5563]">
                            <ChevronRight className="w-4 h-4" />
                            <span className="bg-[linear-gradient(90deg,#6366F1_0%,#A855F7_100%)] text-white px-2 py-1 rounded-full">Pro</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                            <Lock className="w-4 h-4" />
                            <span>0/3</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 flex items-center justify-between border border-[#e2e8f0]">
                        <div className="flex items-center gap-2 text-sm font-medium text-[#4b5563]">
                            <ChevronRight className="w-4 h-4" />
                            <span className="bg-[linear-gradient(90deg,#F59E0B_0%,#F97316_100%)] text-white px-2 py-1 rounded-full">Premium</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                            <Lock className="w-4 h-4" />
                            <span>0/3</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}