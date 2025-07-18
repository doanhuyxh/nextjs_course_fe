import { Book, Sparkles, Video } from "lucide-react";
import React from "react";


export default function Profile({ userInfo }: { userInfo: any }) {
    const handleStudyNow = () => {
        window.location.href = "/study";
    };

    return (
        <div>
            <div className="w-full m-auto flex justify-center flex-col items-center">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex lg:size-20 size-10 items-center justify-center rounded-full bg-[#22c55e]">
                        <Book className="lg:size-10 size-5 text-white" />
                    </div>
                    <h1 className="mb-2 text-2xl font-bold text-white">
                        Chào mừng {userInfo?.firstName || userInfo.email} đến với FlashBot
                    </h1>
                    <p className="mb-8 text-sm text-[#86efac]">Vừa học vừa tạo chatbot cho chính doanh nghiệp của mình</p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-md lg:w-[534px] m-auto">
                    <div className="mb-4 flex items-center justify-between flex-col lg:flex-row">
                        <div className="flex items-center gap-2">
                            <div className="flex lg:size-8 size-6 items-center justify-center rounded-full bg-[#6366f1]">
                                <Video className="lg:size-4 size-3 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">Tiến trình học</h2>
                                <p className="text-sm text-gray-600">
                                    <span className="inline-block size-2 rounded-full bg-[#16a34a] mr-1"></span>
                                    Đã học 1 / 3 bài
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-base font-semibold text-[#2563eb]">Gói miễn phí</p>
                            <p className="text-sm text-[#6b7280]">Còn 3 phút</p>
                        </div>
                    </div>

                    <div className="mb-6 h-2 w-full rounded-full bg-[#f3f4f6]">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#8b5cf6]"
                            style={{ width: "33%" }}
                        ></div>
                    </div>

                    <button onClick={handleStudyNow} className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#22c55e] px-6 py-3 text-lg font-bold text-white shadow-md transition-colors hover:bg-[#16a34a]">
                        <Sparkles className="lg:size-5 size-3 text-white hidden lg:block" />
                        Tiếp tục bài học ngay
                    </button>
                    <p className="text-center text-sm text-[#6b7280]">
                        Hoàn thành bước cài đặt cuối cùng trong bài học tiếp theo.
                    </p>
                </div>
            </div>
            
        </div>
    );
}