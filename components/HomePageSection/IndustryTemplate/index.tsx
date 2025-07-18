import Button from '@/components/Button';


export default function IndustryTemplate() {
    return (
        <section className="w-full bg-white py-16 sm:py-20 md:py-24">
            <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-12 sm:gap-16">
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                            <span className="text-[#111827]">💼 Mẫu theo ngành – </span>
                            <span className="text-[#7c3aed]">Tải xuống và áp dụng</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Template 1 - Fashion */}
                        <div className="border-2 border-[#f3f4f6] rounded-xl p-5 bg-[linear-gradient(159deg,#f9fafb_0%,#ffffff_100%)]">
                            <div className="flex justify-end mb-2">
                                <span className="text-xs text-[#4b5563]">Đang cập nhật</span>
                            </div>
                            <div className="w-12 h-12 bg-[linear-gradient(90deg,#ec4899_0%,#f43f5e_100%)] rounded-xl flex items-center justify-center mb-4 ml-1">
                                <img src="/images_v2/img_background_white_a700_48x48.svg" alt="" className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-[#111827] mb-2 ml-1">Thời trang</h3>
                            <p className="text-xs text-[#4b5563] leading-relaxed mb-3 ml-1">
                                Mẫu chatbot được xây dựng sẵn với các phản hồi và quy trình làm việc cụ thể theo ngành.
                            </p>
                            <div className="flex justify-center gap-2 ml-1">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] text-white"
                                    leftImage={{
                                        src: "/images_v2/img_svg_white_a700_12x12.svg",
                                        width: 12,
                                        height: 12
                                    }}
                                >
                                    Xem ví dụ
                                </Button>
                            </div>
                        </div>
                        {/* Template 2 - Spa */}
                        <div className="border-2 border-[#f3f4f6] rounded-xl p-2 bg-[linear-gradient(159deg,#f9fafb_0%,#ffffff_100%)]">
                            <div className="flex justify-end mb-2 mr-2">
                                <span className="text-xs text-[#4b5563]">Đang cập nhật</span>
                            </div>
                            <img src="/images_v2/img_background_48x48.png" alt="" className="w-12 h-12 rounded-xl mb-4 ml-2" />
                            <h3 className="text-lg font-bold text-[#111827] mb-2 ml-2">Spa</h3>
                            <p className="text-xs text-[#4b5563] leading-relaxed mb-3 ml-2">
                                Mẫu chatbot được xây dựng sẵn với các phản hồi và quy trình làm việc cụ thể theo ngành.
                            </p>
                            <div className="flex gap-2 ml-2 mr-2">
                                <div className="flex items-center justify-center gap-4 !w-[170px] bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg p-[11px 30.27px 11px 30.45px]">
                                    <img src="/images_v2/img_svg_white_a700_12x12.svg" alt="" className="w-3 h-3" />
                                    <span className="text-sm font-bold text-white">Xem ví dụ</span>
                                </div>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="bg-[#f3f4f6] text-[#374151] rounded-lg"
                                    leftImage={{
                                        src: "/images_v2/img_svg_blue_gray_800.svg",
                                        width: 12,
                                        height: 12
                                    }}
                                >
                                    Tải xuống
                                </Button>
                            </div>
                        </div>
                        {/* Template 3 - Education */}
                        <div className="border-2 border-[#f3f4f6] rounded-xl p-3 bg-[linear-gradient(159deg,#f9fafb_0%,#ffffff_100%)]">
                            <div className="flex justify-end mb-2">
                                <span className="text-xs text-[#4b5563]">Đang cập nhật</span>
                            </div>
                            <img src="/images_v2/img_background_1.png" alt="" className="w-12 h-12 rounded-xl mb-4 ml-3" />
                            <h3 className="text-lg font-bold text-[#111827] mb-2 ml-3">Giáo dục</h3>
                            <p className="text-xs text-[#4b5563] leading-relaxed mb-3 ml-3">
                                Mẫu chatbot được xây dựng sẵn với các phản hồi và quy trình làm việc cụ thể theo ngành.
                            </p>
                            <div className="flex gap-2 ml-3 mr-3">
                                <div className="flex items-center justify-center gap-4 !w-[170px] bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg p-[11px 30.27px 11px 30.45px]">
                                    <img src="/images_v2/img_svg_white_a700_12x12.svg" alt="" className="w-3 h-3" />
                                    <span className="text-sm font-bold text-white">Xem ví dụ</span>
                                </div>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="bg-[#f3f4f6] text-[#374151] rounded-lg"
                                    leftImage={{
                                        src: "/images_v2/img_svg_blue_gray_800.svg",
                                        width: 12,
                                        height: 12
                                    }}
                                >
                                    Tải xuống
                                </Button>
                            </div>
                        </div>
                        {/* Template 4 - Agriculture */}
                        <div className="border-2 border-[#f3f4f6] rounded-xl p-4 bg-[linear-gradient(159deg,#f9fafb_0%,#ffffff_100%)]">
                            <div className="flex justify-end mb-2">
                                <span className="text-xs text-[#4b5563]">Đang cập nhật</span>
                            </div>
                            <img src="/images_v2/img_background_2.png" alt="" className="w-12 h-12 rounded-xl mb-4 ml-1.5" />
                            <h3 className="text-lg font-bold text-[#111827] mb-3 ml-1.5">Nông nghiệp</h3>
                            <p className="text-xs text-[#4b5563] leading-relaxed mb-3 ml-1.5">
                                Mẫu chatbot được xây dựng sẵn với các phản hồi và quy trình làm việc cụ thể theo ngành.
                            </p>
                            <div className="flex gap-2 ml-1.5 mr-1.5">
                                <div className="flex items-center justify-center gap-4 !w-[170px] bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg p-[11px 30.27px 11px 30.45px]">
                                    <img src="/images_v2/img_svg_white_a700_12x12.svg" alt="" className="w-3 h-3" />
                                    <span className="text-sm font-bold text-white">Xem ví dụ</span>
                                </div>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="bg-[#f3f4f6] text-[#374151] rounded-lg"
                                    leftImage={{
                                        src: "/images_v2/img_svg_blue_gray_800.svg",
                                        width: 12,
                                        height: 12
                                    }}
                                >
                                    Tải xuống
                                </Button>
                            </div>
                        </div>
                        {/* Template 5 - Repair */}
                        <div className="border-2 border-[#f3f4f6] rounded-xl p-3.5 bg-[linear-gradient(159deg,#f9fafb_0%,#ffffff_100%)]">
                            <div className="flex justify-end mb-2">
                                <span className="text-xs text-[#4b5563]">Đang cập nhật</span>
                            </div>
                            <div className="w-12 h-12 bg-[linear-gradient(90deg,#f97316_0%,#ef4444_100%)] rounded-xl flex items-center justify-center mb-4 ml-2.5">
                                <img src="/images_v2/img_search.svg" alt="" className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-[#111827] mb-3 ml-2.5">Sửa chữa</h3>
                            <p className="text-xs text-[#4b5563] leading-relaxed mb-3 ml-2.5">
                                Mẫu chatbot được xây dựng sẵn với các phản hồi và quy trình làm việc cụ thể theo ngành.
                            </p>
                            <div className="flex gap-2 ml-2.5 mr-2.5">
                                <div className="flex items-center justify-center gap-4 !w-[170px] bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg p-[11px 30.27px 11px 30.45px]">
                                    <img src="/images_v2/img_svg_white_a700_12x12.svg" alt="" className="w-3 h-3" />
                                    <span className="text-sm font-bold text-white">Xem ví dụ</span>
                                </div>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="bg-[#f3f4f6] text-[#374151] rounded-lg"
                                    leftImage={{
                                        src: "/images_v2/img_svg_blue_gray_800.svg",
                                        width: 12,
                                        height: 12
                                    }}
                                >
                                    Tải xuống
                                </Button>
                            </div>
                        </div>
                        {/* Template 6 - Services */}
                        <div className="border-2 border-[#f3f4f6] rounded-xl p-2 bg-[linear-gradient(159deg,#f9fafb_0%,#ffffff_100%)]">
                            <div className="flex justify-end mb-2">
                                <span className="text-xs text-[#4b5563]">Đang cập nhật</span>
                            </div>
                            <img src="/images_v2/img_background_3.png" alt="" className="w-12 h-12 rounded-xl mb-4 ml-2.5" />
                            <h3 className="text-lg font-bold text-[#111827] mb-2 ml-2.5">Dịch vụ</h3>
                            <p className="text-xs text-[#4b5563] leading-relaxed mb-3 ml-2.5">
                                Mẫu chatbot được xây dựng sẵn với các phản hồi và quy trình làm việc cụ thể theo ngành.
                            </p>
                            <div className="flex gap-2 ml-2.5 mr-3.5">
                                <div className="flex items-center justify-center gap-4 !w-[170px] bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg p-[11px 30.27px 11px 30.45px]">
                                    <img src="/images_v2/img_svg_white_a700_12x12.svg" alt="" className="w-3 h-3" />
                                    <span className="text-sm font-bold text-white">Xem ví dụ</span>
                                </div>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="bg-[#f3f4f6] text-[#374151] rounded-lg"
                                    leftImage={{
                                        src: "/images_v2/img_svg_blue_gray_800.svg",
                                        width: 12,
                                        height: 12
                                    }}
                                >
                                    Tải xuống
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="text-center bg-[linear-gradient(90deg,#eab308_0%,#f97316_100%)] rounded-xl px-8 py-8">
                        <p
                            className="text-white text-lg font-bold mb-4"
                        >
                            💡 Tip
                        </p>
                        <p className="text-white text-sm leading-relaxed">
                            Kết hợp mẫu kịch bản theo ngành với video hướng dẫn để thiết lập nhanh nhất!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}