
export default function Testimonials() {
    return (
        <section className="w-full bg-[linear-gradient(176deg,#eff6ff_0%,#eef2ff_100%)] py-16 sm:py-20">
            <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-10 sm:gap-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-tight">
                        <span className="text-[#111827]">Người dùng thật, kết quả thật - </span>
                        <span className="text-[#16a34a]">xem họ nói gì sau khi trải nghiệm</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-white rounded-xl p-6 shadow-[0px_4px_6px_#00000019]">
                            <div className="flex gap-1 mb-5">
                                {[...Array(5)].map((_, i) => (
                                    <img key={i} src="/images_v2/img_svg_amber_600.svg" alt="" className="w-4 h-4" />
                                ))}
                            </div>
                            <p className="text-sm text-[#374151] leading-relaxed mb-6">
                                "Các video hướng dẫn thật sự quá dễ hiểu! Tôi bắt đầu từ con số 0 mà chỉ mất 25 phút để tạo xong chatbot hoạt động. Doanh số của tôi tăng 150% chỉ trong tháng đầu tiên!"
                            </p>
                            <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 bg-[linear-gradient(90deg,#ec4899_0%,#a855f7_100%)] rounded-full flex items-center justify-center">
                                    <span className="text-base font-bold text-white">A</span>
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-[#111827]">Ánh Trần</h4>
                                    <p className="text-sm text-[#4b5563]">Chủ cửa hàng thời trang</p>
                                    <p className="text-xs font-bold text-[#16a34a]">Đã hoàn thành tất cả video hướng dẫn</p>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="bg-white rounded-xl p-6 shadow-[0px_4px_6px_#00000019]">
                            <div className="flex gap-1 mb-5">
                                {[...Array(5)].map((_, i) => (
                                    <img key={i} src="/images_v2/img_svg_amber_600.svg" alt="" className="w-4 h-4" />
                                ))}
                            </div>
                            <p className="text-sm text-[#374151] leading-relaxed mb-6">
                                "Tôi hoàn toàn không rành công nghệ, nhưng các video hướng dẫn từng bước rất dễ hiểu. Giờ tôi có nhiều thời gian hơn cho gia đình, trong khi chatbot vẫn đang bán hàng giúp tôi!"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[linear-gradient(90deg,#3b82f6_0%,#6366f1_100%)] rounded-full flex items-center justify-center">
                                    <span className="text-base font-bold text-white">D</span>
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-[#111827]">Nguyễn Văn Dũng</h4>
                                    <p className="text-sm text-[#4b5563]">Cửa hàng công nghệ</p>
                                    <p className="text-xs font-bold text-[#2563eb]">Thiết lập trong 30 phút</p>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 3 */}
                        <div className="bg-white rounded-xl p-6 shadow-[0px_4px_6px_#00000019]">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <img key={i} src="/images_v2/img_svg_amber_600.svg" alt="" className="w-4 h-4" />
                                ))}
                            </div>
                            <p className="text-sm text-[#374151] leading-relaxed mb-6">
                                "Các mẫu theo ngành giúp tôi tiết kiệm hàng giờ liền! Tôi dùng mẫu dành cho spa và tùy chỉnh theo video hướng dẫn. Kết quả hoàn hảo luôn!"
                            </p>
                            <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 bg-[linear-gradient(90deg,#22c55e_0%,#10b981_100%)] rounded-full flex items-center justify-center">
                                    <span className="text-base font-bold text-white">M</span>
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-[#111827]">Phạm Hoa</h4>
                                    <p className="text-sm text-[#4b5563]">Tiệm Spa</p>
                                    <p className="text-xs font-bold text-[#9333ea]">Mẫu spa đã sử dụng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}