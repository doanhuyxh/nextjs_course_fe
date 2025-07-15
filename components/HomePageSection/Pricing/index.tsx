import Button from "@/components/ui/Button";


export default function Pricing() {
    return (
        <section className="w-full bg-white py-16 sm:py-20">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center gap-3 mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-12">
                        <span className="text-[#111827]">Học tập là </span>
                        <span className="text-[#16a34a]">Miễn phí.</span>
                        <span className="text-[#111827]"> Kết quả là </span>
                        <span className="text-[#7c3aed]">Vô giá.</span>
                    </h2>
                    <div className="flex flex-wrap gap-6 w-full justify-center">
                        {/* Free Plan */}
                        <div className="border-2 border-[#bbf7d0] rounded-3xl p-8 bg-[linear-gradient(115deg,#f0fdf4_0%,#ecfdf5_100%)] mt-3.5 w-[380px] h-[564px]">
                            <div className="text-center mb-8">
                                <h3 className="text-xl font-bold text-[#111827] mb-2">Gói dùng thử</h3>
                                <div className="text-2xl font-bold text-[#16a34a] mb-2">0₫</div>
                                <p className="text-sm text-[#4b5563]">Miễn phí 7 ngày</p>
                            </div>
                            <div className="space-y-4 mb-24">
                                <div className="flex items-center gap-3">
                                    <img src="/images_v2/img_svg_green_a700.svg" alt="" className="w-5 h-5" />
                                    <span className="text-base text-black">Dùng Flashbot Model 1.0</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src="/images_v2/img_svg_green_a700.svg" alt="" className="w-5 h-5" />
                                    <span className="text-base text-nowrap text-black">Giới hạn 2 trang, 2 website</span>
                                </div>
                                <div className="relative">
                                    <div className="flex items-center gap-3">
                                        <img src="/images_v2/img_svg_green_a700.svg" alt="" className="w-5 h-5" />
                                        <span className="text-base text-black">Giới hạn 1000 tin nhắn và 100 nội dung training</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src="/images_v2/img_svg_green_a700.svg" alt="" className="w-5 h-5" />
                                    <span className="text-base text-black">Video hướng dẫn</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src="/images_v2/img_svg_green_a700.svg" alt="" className="w-5 h-5" />
                                    <span className="text-base text-black ">Mẫu ngành</span>
                                </div>
                            </div>
                            <a href="https://flashbot.vn/" rel="noopener noreferrer">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full bg-[linear-gradient(90deg,#22c55e_0%,#059669_100%)] rounded-[30px] text-nowrap tranform translate-y-[-50%]"
                                >
                                    Bắt đầu dùng thử miễn phí
                                </Button>
                            </a>
                        </div>
                        {/* Basic Plan */}
                        <div className="border-2 border-[#e5e7eb] rounded-3xl p-8 bg-white mt-3.5  w-[380px] h-[564px]">
                            <div className="text-center mb-8">
                                <h3 className="text-xl font-bold text-[#111827] mb-2">Gói Basic</h3>
                                <div className="text-2xl font-bold text-[#2563eb] mb-2">699.000₫</div>
                                <p className="text-sm text-[#4b5563]">mỗi tháng</p>
                            </div>
                            <div className="space-y-4 mb-24">
                                <div className="flex items-center gap-3">
                                    <img src="/images_v2/img_svg_blue_a200.svg" alt="" className="w-5 h-5" />
                                    <span className="text-base text-black">Dùng Flashbot Model 1.0</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src="/images_v2/img_svg_blue_a200.svg" alt="" className="w-5 h-5" />
                                    <span className="text-base text-black text-nowrap">Giới hạn 6 trang, 6 website</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src="/images_v2/img_svg_blue_a200.svg" alt="" className="w-5 h-5" />
                                    <span className="text-base text-black">6000 tin nhắn/tháng</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src="/images_v2/img_svg_blue_a200.svg" alt="" className="w-5 h-5" />
                                    <span className="text-base text-black">Giới hạn 100 tài liệu training</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src="/images_v2/img_svg_blue_a200.svg" alt="" className="w-5 h-5" />
                                    <span className="text-sm text-black">Trò chuyện hỗ trợ ngay lập tức</span>
                                </div>
                            </div>
                            <a href="https://flashbot.vn/" rel="noopener noreferrer">
                                <Button
                                    variant="gradient"
                                    size="lg"
                                    className="w-full bg-[linear-gradient(90deg,#3b82f6_0%,#4f46e5_100%)] rounded-[30px]"
                                >
                                    Chọn gói Basic
                                </Button>
                            </a>
                        </div>
                        {/* Pro Plan */}
                        <div className="border-2 border-[#e5e7eb] rounded-3xl p-8 bg-white  mt-3.5 w-[380px] h-[564px]">
                            <div className="text-center mb-8">
                                <h3 className="text-xl font-bold text-[#111827] mb-2">Gói Pro</h3>
                                <div className="text-2xl font-bold text-[#f97316] mb-2">1.399.000₫</div>
                                <p className="text-sm text-[#4b5563]">mỗi tháng</p>
                            </div>
                            <div className="space-y-4 mb-16">
                                <div className="flex items-center gap-3">
                                    <img src="/images_v2/img_svg_yellow_900.svg" alt="" className="w-5 h-5" />
                                    <span className="text-base text-black">Dùng Flashbot Model 2.0</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src="/images_v2/img_svg_yellow_900.svg" alt="" className="w-5 h-5" />
                                    <span className="text-base text-black text-nowrap">Giới hạn 15 trang, 15 website</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src="/images_v2/img_svg_yellow_900.svg" alt="" className="w-5 h-5" />
                                    <span className="text-base text-black">15.000 tin nhắn/tháng</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src="/images_v2/img_svg_yellow_900.svg" alt="" className="w-5 h-5" />
                                    <span className="text-base text-black">Không giới hạn tài liệu</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src="/images_v2/img_svg_yellow_900.svg" alt="" className="w-5 h-5" />
                                    <span className="text-sm text-black">Kho ảnh: 250 tấm</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src="/images_v2/img_svg_yellow_900.svg" alt="" className="w-5 h-5" />
                                    <span className="text-sm text-black">Trò chuyện hỗ trợ ngay lập tức</span>
                                </div>
                            </div>
                            <a href="https://flashbot.vn/" rel="noopener noreferrer">
                                <Button
                                    variant="gradient"
                                    size="lg"
                                    className="w-full bg-[linear-gradient(90deg,#eab308_0%,#f97316_100%)] rounded-[30px]"
                                >
                                    Chọn gói Pro
                                </Button>
                            </a>
                        </div>
                        {/* Premium Plan */}
                        <div className="relative  w-[380px] h-[564px]">
                            <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                                <span className="bg-[linear-gradient(90deg,#a855f7_0%,#3b82f6_100%)] text-white text-sm text-nowrap font-bold px-7 py-2 rounded-[18px]">
                                    Khuyến nghị
                                </span>
                            </div>
                            <div className="border-2 border-[#a855f7] rounded-3xl p-8 bg-[linear-gradient(115deg,#faf5ff_0%,#eff6ff_100%)] mt-3.5 w-full h-full">
                                <div className="text-center mb-8">
                                    <h3 className="text-xl font-bold text-[#111827] mb-2">Pro</h3>
                                    <div className="text-3xl font-bold text-[#9333ea] mb-2">2.099.000₫</div>
                                    <p className="text-sm text-[#4b5563]">mỗi tháng</p>
                                </div>
                                <div className="space-y-4 mb-10">
                                    <div className="flex items-center gap-4">
                                        <img src="/images_v2/img_svg_deep_purple_a200_03.svg" alt="" className="w-5 h-5" />
                                        <span className="text-base text-black">Dùng Flashbot Model 3.0</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img src="/images_v2/img_svg_deep_purple_a200_03.svg" alt="" className="w-5 h-5" />
                                        <span className="text-sm text-black">Giới hạn 100 trang, 100 website</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img src="/images_v2/img_svg_deep_purple_a200_03.svg" alt="" className="w-5 h-5" />
                                        <span className="text-base text-black">50.000 tin nhắn/tháng</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img src="/images_v2/img_svg_deep_purple_a200_03.svg" alt="" className="w-5 h-5" />
                                        <span className="text-sm text-black">Không giới hạn tài liệu</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img src="/images_v2/img_svg_deep_purple_a200_03.svg" alt="" className="w-5 h-5" />
                                        <span className="text-sm text-black">Hỗ trợ kịch bản tư vấn 1/1</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img src="/images_v2/img_svg_deep_purple_a200_03.svg" alt="" className="w-5 h-5" />
                                        <span className="text-sm text-black">Kho ảnh: 800 tấm</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img src="/images_v2/img_svg_deep_purple_a200_03.svg" alt="" className="w-5 h-5" />
                                        <span className="text-sm text-black">Trò chuyện hỗ trợ ngay lập tức</span>
                                    </div>
                                </div>
                                <a href="https://flashbot.vn/" rel="noopener noreferrer">
                                    <Button
                                        variant="gradient"
                                        size="lg"
                                        className="w-full bg-[linear-gradient(90deg,#a855f7_0%,#2563eb_100%)] rounded-[30px]"
                                    >
                                        Chọn gói Pro
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}