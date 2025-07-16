import Button from '@/components/Button';

export default function ProblemsAndSolutions() {
    return (
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
    )
}