
import Button from "@/components/ui/Button"

export default function Hero() {
    return (
        <section className="w-full bg-[linear-gradient(173deg,#3b82f6_0%,#4f46e5_50%,#6d28d9_100%)] py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="flex flex-col gap-6 sm:gap-7 md:gap-8 w-full lg:w-1/2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                <span className="text-white">Bắt đầu xây dựng </span>
                <span className="text-[#fde047]">Chatbot 24/7</span>
                <span className="text-white"> của bạn chỉ trong 30 phút</span>
              </h1>
              <div className="flex flex-col gap-6 sm:gap-7">
                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
                  <span className="text-[#dbeafe]">FlashBot giúp bạn phục vụ khách hàng cả ngày lẫn đêm. Học cách thiết lập từng bước – </span>
                  <span className="text-[#fde047]">không cần kỹ thuật, ai cũng làm được.</span>
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-[linear-gradient(90deg,#22c55e_0%,#059669_100%)] rounded-xl shadow-[0px_8px_10px_#00000019] w-fit"
                  leftImage={{
                    src: "/images_v2/img_svg_white_a700_24x24.svg",
                    width: 24,
                    height: 24
                  }}
                >
                  Xem hướng dẫn ngay
                </Button>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8">
                  <div className="flex items-center gap-2">
                    <img src="/images_v2/img_svg_green_400.svg" alt="" className="w-4 h-4" />
                    <span className="text-xs sm:text-sm text-[#bfdbfe]">Video hướng dẫn từng bước</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/images_v2/img_svg_green_400.svg" alt="" className="w-4 h-4" />
                    <span className="text-xs sm:text-sm text-[#bfdbfe]">Không cần lập trình</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/images_v2/img_svg_green_400.svg" alt="" className="w-4 h-4" />
                    <span className="text-xs sm:text-sm text-[#bfdbfe]">Đã bao gồm mẫu theo từng ngành</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Content - Tutorial Progress Card */}
            <div className="w-full lg:w-1/3 max-w-md">
              <div className="bg-[#ffffff19] border border-[#ffffff33] rounded-2xl p-6 sm:p-8 shadow-[0px_4px_4px_#888888ff]">
                <div className="flex flex-col items-center gap-6">
                  <div className="w-16 h-16 bg-[linear-gradient(90deg,#22c55e_0%,#10b981_100%)] rounded-full flex items-center justify-center">
                    <img src="/images_v2/img_background.svg" alt="" className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-base font-bold text-white mb-1">Đăng ký</h3>
                    <p className="text-xs text-[#86efac]">Following step-by-step tutorials</p>
                  </div>
                  <div className="w-full bg-white rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <img src="/images_v2/img_background_white_a700.png" alt="" className="w-8 h-8 rounded-full" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-bold text-[#111827]">Tutorial Progress</span>
                          <span className="text-sm font-bold text-[#2563eb]">50% Complete</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full"></div>
                            <span className="text-xs text-[#16a34a]">Lesson 3 of 6</span>
                          </div>
                          <span className="text-xs text-[#6b7280]">15 min left</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-[#f3f4f6] rounded h-2 mb-3">
                      <div className="w-1/2 h-full bg-[linear-gradient(90deg,#3b82f6_0%,#8b5cf6_100%)] rounded"></div>
                    </div>
                    <div className="bg-[linear-gradient(90deg,#22c55e_0%,#10b981_100%)] rounded-lg p-3 text-center">
                      <span className="text-xs text-[#dcfce7]">🎉 Your Bot is Almost Ready!</span>
                      <p className="text-xs text-[#dcfce7] mt-1">Complete setup in next lesson</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-[#fde047] text-center">
                    Học một lần, lợi nhuận mãi mãi!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}