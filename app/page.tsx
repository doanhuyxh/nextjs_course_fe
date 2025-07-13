
import Header from '@/components/HomePageSection/common/Header';
import Footer from '@/components/HomePageSection/common/Footer';
import Button from '@/components/ui/Button';
import EditText from '@/components/ui/EditText';
const FlashBotLandingPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <Header />
      {/* Hero Section */}
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
      {/* Problems vs Solutions Section */}
      <section className="w-full bg-white py-16 sm:py-20 md:py-24">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 sm:gap-12 md:gap-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
              <span className="text-[#111827]">Trả lời thủ công đang </span>
              <span className="text-[#dc2626]">làm mất thời gian của bạn.</span>
              <br />
              <span className="text-[#111827]">FlashBot </span>
              <span className="text-[#16a34a]">sẽ thay đổi điều đó.</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Problems */}
              <div className="flex flex-col gap-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#111827]">Những nỗi đau thường gặp:</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <img src="/images_v2/img_background_deep_orange_50.svg" alt="" className="w-9 h-9 rounded-lg flex-shrink-0" />
                    <div>
                      <h4 className="text-base font-bold text-[#111827] mb-1">Bỏ lỡ khách hàng tiềm năng vào ban đêm</h4>
                      <p className="text-sm text-[#4b5563]">Khách nhắn lúc 2 giờ sáng, sáng ra đã biến mất.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <img src="/images_v2/img_background_orange_50.svg" alt="" className="w-9 h-9 rounded-lg flex-shrink-0" />
                    <div>
                      <h4 className="text-base font-bold text-[#111827] mb-1">Kiệt sức hoàn toàn</h4>
                      <p className="text-sm text-[#4b5563]">Trả lời cùng một câu hỏi 50 lần mỗi ngày</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <img src="/images_v2/img_background_purple_50.svg" alt="" className="w-9 h-9 rounded-lg flex-shrink-0" />
                    <div>
                      <h4 className="text-base font-bold text-[#111827] mb-1">Chi phí nhân viên cao</h4>
                      <p className="text-xs text-[#4b5563]">8-15 triệu mỗi tháng, chưa kể đau đầu vì phải đào tạo nhân viên</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Solutions */}
              <div className="flex flex-col gap-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#111827]">Với FlashBot - Giải pháp toàn diện cho mọi rắc rối dưới đây:</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <img src="/images_v2/img_background_green_50.svg" alt="" className="w-9 h-9 rounded-lg flex-shrink-0" />
                    <div>
                      <h4 className="text-base font-bold text-[#111827] mb-1">Trả lời tự động 24/7</h4>
                      <p className="text-sm text-[#4b5563]">Không bao giờ bỏ lỡ khách hàng nào nữa, ngay cả khi đang ngủ</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-9 h-9 bg-[#dbeafe] rounded-lg flex items-center justify-center flex-shrink-0">
                      <img src="/images_v2/img_background_blue_a700.svg" alt="" className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#111827] mb-1">Tiết kiệm thời gian và giữ gìn sự tỉnh táo</h4>
                      <p className="text-sm text-[#4b5563]">Tập trung vào phát triển doanh nghiệp, thay vì làm những việc lặp đi lặp lại.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <img src="/images_v2/img_background_deep_purple_50.svg" alt="" className="w-9 h-9 rounded-lg flex-shrink-0" />
                    <div>
                      <h4 className="text-base font-bold text-[#111827] mb-1">Bán hàng mọi lúc – kể cả khi bạn đang ngủ</h4>
                      <p className="text-xs text-[#4b5563]">Chuyển đổi khách tiềm năng thành khách hàng một cách tự động</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button
                variant="gradient"
                size="lg"
                className="bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-xl"
              >
                Học cách tự động hóa bán hàng – không cần biết lập trình
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Learning Center Section */}
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
              {/* Tutorial Card 1 */}
              <div className="bg-white rounded-xl shadow-[0px_4px_6px_#00000019] overflow-hidden">
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
              </div>
              {/* Tutorial Card 2 */}
              <div className="bg-white rounded-xl shadow-[0px_4px_6px_#00000019] overflow-hidden">
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
              </div>
              {/* Tutorial Card 3 */}
              <div className="bg-white rounded-xl shadow-[0px_4px_6px_#00000019] overflow-hidden">
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
              </div>
              {/* Tutorial Card 4 */}
              <div className="bg-white rounded-xl shadow-[0px_4px_6px_#00000019] overflow-hidden">
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
              </div>
              {/* Tutorial Card 5 */}
              <div className="bg-white rounded-xl shadow-[0px_4px_6px_#00000019] overflow-hidden">
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
              </div>
              {/* Tutorial Card 6 */}
              <div className="bg-white rounded-xl shadow-[0px_4px_6px_#00000019] overflow-hidden">
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
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Industry Templates Section */}
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
                <div className="flex gap-2 ml-1">
                  <div className="flex items-center gap-4 bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg py-1.5 px-1.5">
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
                  <div className="flex items-center gap-4 bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg py-1.5 px-1.5">
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
                  <EditText
                    placeholder="Xem ví dụ"
                    variant="gradient"
                    className="flex-1"
                    leftImage={{
                      src: "/images_v2/img_svg_white_a700_12x12.svg",
                      width: 12,
                      height: 12
                    }}
                  />
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
                  <div className="flex items-center gap-4 bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg py-1.5 px-1.5">
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
                  <div className="flex items-center gap-4 bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg py-1.5 px-1.5">
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
                  <EditText
                    placeholder="Xem ví dụ"
                    variant="gradient"
                    className="flex-1"
                    leftImage={{
                      src: "/images_v2/img_svg_white_a700_12x12.svg",
                      width: 12,
                      height: 12
                    }}
                  />
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
                    tải xuống
                  </Button>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button
                variant="gradient"
                size="lg"
                className="bg-[linear-gradient(90deg,#eab308_0%,#f97316_100%)] rounded-xl px-8 py-8"
              >
                💡 Tip
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
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
      {/* Pricing Section */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-tight mb-12">
              <span className="text-[#111827]">Học tập là </span>
              <span className="text-[#16a34a]">Miễn phí.</span>
              <span className="text-[#111827]"> Kết quả là </span>
              <span className="text-[#7c3aed]">Vô giá.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Free Plan */}
              <div className="border-2 border-[#bbf7d0] rounded-3xl p-8 bg-[linear-gradient(115deg,#f0fdf4_0%,#ecfdf5_100%)] mt-3.5">
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
                    <span className="text-base text-black">Giới hạn 2 trang, 2 website</span>
                  </div>
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <img src="/images_v2/img_svg_green_a700.svg" alt="" className="w-5 h-5" />
                      <span className="text-base text-black">Giới hạn 1000 tin nhắn và 100 nội dung training</span>
                    </div>
                    <img src="/images_v2/img_vector.svg" alt="" className="w-2 h-2.5 ml-1.5 mt-1" />
                  </div>
                  <div className="flex items-center gap-3">
                    <img src="/images_v2/img_svg_green_a700.svg" alt="" className="w-5 h-5" />
                    <span className="text-base text-black">Video hướng dẫn</span>
                  </div>
                  <div className="relative">
                    <img src="/images_v2/img_vector_green_a700.svg" alt="" className="w-4 h-4 ml-0.5" />
                    <span className="text-base text-black ml-8">Mẫu ngành</span>
                    <img src="/images_v2/img_vector.svg" alt="" className="w-2 h-2.5 ml-1.5" />
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-[linear-gradient(90deg,#22c55e_0%,#059669_100%)] rounded-[30px]"
                >
                  Bắt đầu dùng thử miễn phí
                </Button>
              </div>
              {/* Basic Plan */}
              <div className="border-2 border-[#e5e7eb] rounded-3xl p-8 bg-white mt-3.5">
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
                    <span className="text-base text-black">Giới hạn 6 trang, 6 website</span>
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
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full bg-[linear-gradient(90deg,#3b82f6_0%,#4f46e5_100%)] rounded-[30px]"
                >
                  Chọn gói Basic
                </Button>
              </div>
              {/* Pro Plan */}
              <div className="border-2 border-[#e5e7eb] rounded-3xl p-8 bg-white mt-3.5">
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
                    <span className="text-base text-black">Giới hạn 15 trang, 15 website</span>
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
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full bg-[linear-gradient(90deg,#eab308_0%,#f97316_100%)] rounded-[30px]"
                >
                  Chọn gói Pro
                </Button>
              </div>
              {/* Premium Plan */}
              <div className="relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[linear-gradient(90deg,#a855f7_0%,#3b82f6_100%)] text-white text-sm text-nowrap font-bold px-7 py-2 rounded-[18px]">
                    Khuyến nghị
                  </span>
                </div>
                <div className="border-2 border-[#a855f7] rounded-3xl p-8 bg-[linear-gradient(115deg,#faf5ff_0%,#eff6ff_100%)]">
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
                  <Button
                    variant="gradient"
                    size="lg"
                    className="w-full bg-[linear-gradient(90deg,#a855f7_0%,#2563eb_100%)] rounded-[30px]"
                  >
                    Choose Pro
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
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
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-[#16a34a] shadow-[0px_8px_10px_#00000019] rounded-xl"
                leftImage={{
                  src: "/images_v2/img_svg_green_700.svg",
                  width: 24,
                  height: 24
                }}
              >
                Bắt đầu học ngay
              </Button>
              <div className="flex items-center gap-2 bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-xl px-4 py-4">
                <img src="/images_v2/img_svg_white_a700_20x20.svg" alt="" className="w-5 h-5" />
                <span className="text-lg font-bold text-white">Đã xem xong? Đăng ký chatbot của bạn ngay!</span>
              </div>
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
      {/* Footer */}
      <Footer />
    </div>
  );
};
export default FlashBotLandingPage;