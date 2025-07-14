import Button from "@/components/ui/Button"
import fetchData from "@/libs/configs/ApiConfig/fetchDataServer"


export default async function LearningCenter() {

    const getCourse = await fetchData('/course/GetAllCourse', '');
    const json_data = getCourse?.data || [];

    return (
        <section className="w-full bg-[linear-gradient(159deg,#f9fafb_0%,#eff6ff_100%)] py-16 sm:py-20 md:py-24">
            <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-12 sm:gap-16">
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                            <span className="text-[#111827]">📚 Trung tâm Học Tập FlashBot – </span>
                            <span className="text-[#2563eb]">Video hướng dẫn từng bước</span>
                        </h2>
                        <p className="text-lg text-[#4b5563]">Nhấp vào từng bài học để xem và áp dụng ngay.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

                        {json_data.map((course: any, index: number) => (
                            <div key={index} className="bg-white rounded-xl shadow-[0px_4px_6px_#00000019] overflow-hidden">
                                <div className="relative">
                                    <div className={`h-50 flex items-center justify-center relative`}
                                        style={{
                                            backgroundImage: `url(${course?.image || ""})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "cover",
                                        }}>
                                        <img src="/images_v2/img_.png" alt="" className="absolute top-4 right-4 w-6 h-4" />
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-[#22c55e] text-white text-xs font-bold px-3 py-1 rounded-[10px]">MỚI</span>
                                        </div>
                                        <div className="w-14 h-14 bg-[#ffffffe5] rounded-full flex items-center justify-center cursor-pointer">
                                            <img src="/images_v2/img_overlay.svg" alt="" className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="bg-[#dcfce7] text-[#15803d] text-xs px-2 py-1 rounded-xl">Người mới bắt đầu</span>
                                        <div className="flex items-center gap-1">
                                            <img src="/images_v2/img_svg_gray_600.svg" alt="" className="w-3 h-3" />
                                            <span className="text-xs text-[#6b7280]">{course?.totalTimeDuration || ""}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#111827] mb-4">Cách tạo tài khoản FlashBot của bạn</h3>
                                    <div className="text-sm text-[#4b5563] mb-6 leading-relaxed line-clamp-2 overflow-hidden"
                                        dangerouslySetInnerHTML={{ __html: course?.description || "" }} />
                                    <Button
                                        variant="gradient"
                                        size="md"
                                        className="w-full bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg"
                                        leftImage={{
                                            src: "/images_v2/img_svg_white_a700_24x24.svg",
                                            width: 16,
                                            height: 16
                                        }}
                                    >
                                        Xem ngay
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {/* Tutorial Card 1 */}
                        {/* <div className="bg-white rounded-xl shadow-[0px_4px_6px_#00000019] overflow-hidden">
                            <div className="relative">
                                <div className="bg-[linear-gradient(174deg,#3b82f6_0%,#7c3aed_100%)] h-32 flex items-center justify-center relative">
                                    <img src="/images_v2/img_.png" alt="" className="absolute top-4 right-4 w-6 h-4" />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-[#22c55e] text-white text-xs font-bold px-3 py-1 rounded-[10px]">MỚI</span>
                                    </div>
                                    <div className="w-14 h-14 bg-[#ffffffe5] rounded-full flex items-center justify-center">
                                        <img src="/images_v2/img_overlay.svg" alt="" className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="bg-[#dcfce7] text-[#15803d] text-xs px-2 py-1 rounded-xl">Người mới bắt đầu</span>
                                    <div className="flex items-center gap-1">
                                        <img src="/images_v2/img_svg_gray_600.svg" alt="" className="w-3 h-3" />
                                        <span className="text-xs text-[#6b7280]">1:08</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-[#111827] mb-4">Cách tạo tài khoản FlashBot của bạn</h3>
                                <p className="text-sm text-[#4b5563] mb-6 leading-relaxed">
                                    Bắt đầu sử dụng FlashBot trong vòng chưa đầy 2 phút. Hướng dẫn thiết lập đầy đủ.
                                </p>
                                <Button
                                    variant="gradient"
                                    size="md"
                                    className="w-full bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg"
                                    leftImage={{
                                        src: "/images_v2/img_svg_white_a700_24x24.svg",
                                        width: 16,
                                        height: 16
                                    }}
                                >
                                    Xem ngay
                                </Button>
                            </div>
                        </div> */}
                        {/* Tutorial Card 2 */}
                        {/* <div className="bg-white rounded-xl shadow-[0px_4px_6px_#00000019] overflow-hidden">
                            <div className="relative">
                                <div className="bg-[linear-gradient(174deg,#3b82f6_0%,#7c3aed_100%)] h-32 flex items-center justify-center relative">
                                    <img src="/images_v2/img__24x18.png" alt="" className="absolute top-4 right-4 w-6 h-4" />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-[#3b82f6] text-white text-xs font-bold px-2 py-1 rounded-[10px]">PHỔ BIẾN</span>
                                    </div>
                                    <div className="w-14 h-14 bg-[#ffffffe5] rounded-full flex items-center justify-center">
                                        <img src="/images_v2/img_overlay.svg" alt="" className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="bg-[#dcfce7] text-[#15803d] text-xs px-2 py-1 rounded-xl">Người mới bắt đầu</span>
                                    <div className="flex items-center gap-1">
                                        <img src="/images_v2/img_svg_gray_600.svg" alt="" className="w-3 h-3" />
                                        <span className="text-xs text-[#6b7280]">7:15</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-[#111827] mb-4 leading-tight">
                                    Cách huấn luyện Chatbot của bạn (Tải lên Câu hỏi thường gặp)
                                </h3>
                                <p className="text-sm text-[#4b5563] mb-6 leading-relaxed">
                                    Dạy Chatbot của bạn cách trả lời như nhân viên bán hàng giỏi nhất.
                                </p>
                                <Button
                                    variant="gradient"
                                    size="md"
                                    className="w-full bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg"
                                    leftImage={{
                                        src: "/images_v2/img_svg_white_a700_24x24.svg",
                                        width: 16,
                                        height: 16
                                    }}
                                >
                                    Xem ngay
                                </Button>
                            </div>
                        </div> */}
                        {/* Tutorial Card 3 */}
                        {/* <div className="bg-white rounded-xl shadow-[0px_4px_6px_#00000019] overflow-hidden">
                            <div className="relative">
                                <div className="bg-[linear-gradient(174deg,#3b82f6_0%,#7c3aed_100%)] h-32 flex items-center justify-center relative">
                                    <img src="/images_v2/img__1.png" alt="" className="absolute top-4 right-4 w-6 h-4" />
                                    <div className="w-14 h-14 bg-[#ffffffe5] rounded-full flex items-center justify-center">
                                        <img src="/images_v2/img_overlay.svg" alt="" className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="bg-[#dcfce7] text-[#15803d] text-xs px-2 py-1 rounded-xl">Người mới bắt đầu</span>
                                    <div className="flex items-center gap-1">
                                        <img src="/images_v2/img_svg_gray_600.svg" alt="" className="w-3 h-3" />
                                        <span className="text-xs text-[#6b7280]">4:28</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-[#111827] mb-4">Cách kết nối trang Facebook của bạn</h3>
                                <p className="text-xs text-[#4b5563] mb-6 leading-relaxed">
                                    Tích hợp với trang doanh nghiệp Facebook của bạn chỉ bằng một cú nhấp chuột.
                                </p>
                                <Button
                                    variant="gradient"
                                    size="md"
                                    className="w-full bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg"
                                    leftImage={{
                                        src: "/images_v2/img_svg_white_a700_24x24.svg",
                                        width: 16,
                                        height: 16
                                    }}
                                >
                                    Xem ngay
                                </Button>
                            </div>
                        </div> */}
                        {/* Tutorial Card 4 */}
                        {/* <div className="bg-white rounded-xl shadow-[0px_4px_6px_#00000019] overflow-hidden">
                            <div className="relative">
                                <div className="bg-[linear-gradient(174deg,#3b82f6_0%,#7c3aed_100%)] h-32 flex items-center justify-center relative">
                                    <img src="/images_v2/img__2.png" alt="" className="absolute top-4 right-4 w-6 h-4" />
                                    <div className="w-14 h-14 bg-[#ffffffe5] rounded-full flex items-center justify-center">
                                        <img src="/images_v2/img_overlay.svg" alt="" className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="bg-[#fef9c3] text-[#a16207] text-xs px-2 py-1 rounded-xl">Trung cấp</span>
                                    <div className="flex items-center gap-1">
                                        <img src="/images_v2/img_svg_gray_600.svg" alt="" className="w-3 h-3" />
                                        <span className="text-xs text-[#6b7280]">9:33</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-[#111827] mb-6">Cách tạo Chatbot cho ngành của bạn</h3>
                                <p className="text-sm text-[#4b5563] mb-6 leading-relaxed">
                                    Tùy chỉnh FlashBot cho thời trang, làm đẹp, dịch vụ, v.v.
                                </p>
                                <div className="flex items-center justify-center gap-3.5 bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg py-1.5 px-1.5">
                                    <img src="/images_v2/img_svg_white_a700_24x24.svg" alt="" className="w-4 h-4" />
                                    <span className="text-base font-bold text-white">Xem ngay</span>
                                </div>
                            </div>
                        </div> */}
                        {/* Tutorial Card 5 */}
                        {/* <div className="bg-white rounded-xl shadow-[0px_4px_6px_#00000019] overflow-hidden">
                            <div className="relative">
                                <div className="bg-[linear-gradient(174deg,#3b82f6_0%,#7c3aed_100%)] h-32 flex items-center justify-center relative">
                                    <img src="/images_v2/img__3.png" alt="" className="absolute top-4 right-4 w-6 h-4" />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-[#a855f7] text-white text-xs font-bold px-1.5 py-1 rounded-[10px]">PRO</span>
                                    </div>
                                    <div className="w-14 h-14 bg-[#ffffffe5] rounded-full flex items-center justify-center">
                                        <img src="/images_v2/img_overlay.svg" alt="" className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="bg-[#fee2e2] text-[#b91c1c] text-xs px-2 py-1 rounded-xl">Trình độ cao</span>
                                    <div className="flex items-center gap-1">
                                        <img src="/images_v2/img_svg_gray_600.svg" alt="" className="w-3 h-3" />
                                        <span className="text-xs text-[#6b7280]">12:17</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-[#111827] mb-4">Cách tối ưu hóa phản hồi để chuyển đổi</h3>
                                <p className="text-sm text-[#4b5563] mb-16 leading-relaxed">
                                    Kỹ thuật tiên tiến giúp tăng doanh số từ các cuộc trò chuyện.
                                </p>
                                <div className="flex items-center justify-center gap-3.5 bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg py-1.5 px-1.5">
                                    <img src="/images_v2/img_svg_white_a700_24x24.svg" alt="" className="w-4 h-4" />
                                    <span className="text-base font-bold text-white">Xem ngay</span>
                                </div>
                            </div>
                        </div> */}
                        {/* Tutorial Card 6 */}
                        {/* <div className="bg-white rounded-xl shadow-[0px_4px_6px_#00000019] overflow-hidden">
                            <div className="relative">
                                <div className="bg-[linear-gradient(174deg,#3b82f6_0%,#7c3aed_100%)] h-32 flex items-center justify-center relative">
                                    <img src="/images_v2/img__4.png" alt="" className="absolute top-4 right-4 w-6 h-4" />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-[#eab308] text-black text-xs font-bold px-1.5 py-1 rounded-[10px]">BONUS</span>
                                    </div>
                                    <div className="w-14 h-14 bg-[#ffffffe5] rounded-full flex items-center justify-center">
                                        <img src="/images_v2/img_overlay.svg" alt="" className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="bg-[#dbeafe] text-[#1d4ed8] text-xs px-2 py-1 rounded-xl">Tất cả các cấp độ</span>
                                    <div className="flex items-center gap-1">
                                        <img src="/images_v2/img_svg_gray_600.svg" alt="" className="w-3 h-3" />
                                        <span className="text-xs text-[#6b7280]">6:45</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-[#111827] mb-4 leading-tight">
                                    Nâng cấp lên Pro – Mở khóa các tính năng nâng cao
                                </h3>
                                <p className="text-sm text-[#4b5563] mb-6 leading-relaxed">
                                    Khám phá các tính năng cao cấp giúp tăng kết quả lên 10 lần.
                                </p>
                                <Button
                                    variant="gradient"
                                    size="md"
                                    className="w-full bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg"
                                    leftImage={{
                                        src: "/images_v2/img_svg_white_a700_24x24.svg",
                                        width: 16,
                                        height: 16
                                    }}
                                >
                                    Xem ngay
                                </Button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}