import Button from '@/components/Button';
import Link from "next/link";

export default function CTA() {
    return (
        <section className="w-full bg-[linear-gradient(90deg,#22c55e_0%,#059669_50%,#0d9488_100%)] py-16 sm:py-20">
            <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-8 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                        <span className="text-white">Sẵn sàng tạo</span>
                        <span className="text-[#fde047]"> Chatbot AI cho riêng bạn chưa?</span>
                    </h2>
                    <p className="text-lg text-[#dcfce7] max-w-2xl">
                        Xem ngay video đầu tiên và tạo FlashBot của bạn chỉ trong chưa đầy 10 phút.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3.5 items-center">
                        <Link href="/study">
                            <Button
                                size="lg"
                                className="bg-white !text-[#16a34a] rounded-xl hover:!bg-[#f0fdf4] hover:!text-[#15803d] transition-colors duration-200"
                                leftImage={{
                                    src: "/images_v2/img_svg_amber_a200_v2.svg",
                                    width: 24,
                                    height: 24
                                }}
                            >
                                Bắt đầu học ngay
                            </Button>
                        </Link>
                        <a href="https://flashbot.vn/" className="flex items-center gap-2 bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-xl px-4 py-4">
                            <img src="/images_v2/img_svg_white_a700_20x20.svg" alt="" className="w-5 h-5" />
                            <span className="text-lg font-bold text-white">Đã xem xong? Đăng ký chatbot của bạn ngay!</span>
                        </a>
                    </div>
                    <div className="bg-[#ffffff19] rounded-xl p-5 shadow-[0px_4px_4px_#888888ff] max-w-2xl">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-center gap-2.5">
                                <img src="/images_v2/img_svg_amber_a200.svg" alt="" className="w-6 h-6" />
                                <h3 className="text-lg font-bold text-white">Phần thưởng: Lộ trình học tập hoàn chỉnh</h3>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="flex flex-col items-center gap-1.5">
                                    <img src="/images_v2/img__32x24.png" alt="" className="w-8 h-6" />
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-white">Video hướng dẫn</p>
                                        <p className="text-xs text-[#bbf7d0]">Từng bước một</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-7">
                                    <div className="flex flex-col items-center gap-1.5">
                                        <img src="/images_v2/img__5.png" alt="" className="w-8 h-6" />
                                        <div className="text-center">
                                            <p className="text-xs font-bold text-white">Mẫu</p>
                                            <p className="text-xs text-[#bbf7d0]">Ngành cụ thể</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1.5">
                                        <img src="/images_v2/img__6.png" alt="" className="w-8 h-6" />
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-white">30 Phút</p>
                                            <p className="text-sm text-[#bbf7d0]"> Đến thành công</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}