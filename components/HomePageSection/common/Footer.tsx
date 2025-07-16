'use client';
import React from 'react';
import Button from '@/components/Button';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#111827] py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="flex flex-col gap-5 w-full lg:w-1/3">
              <div className="flex items-center gap-2">
                <img
                  src="/images_v2/img_svg_deep_purple_a200.svg"
                  alt="FlashBot Logo"
                  className="w-6 h-6"
                />
                <h2 className="text-lg font-bold text-white">FlashBot</h2>
                <Button
                  variant="gradient"
                  size="xs"
                  className="bg-[#8b5cf6] rounded-[14px] px-2 py-1.5 text-xs"
                >
                  Learning
                </Button>
              </div>
              <p className="text-sm text-[#9ca3af] leading-relaxed">
                Học cách xây dựng chatbot AI hoạt động 24/7. Hướng dẫn từng bước dành cho người dùng không chuyên.
              </p>
            </div>

            {/* Learning Resources */}
            <div className="flex flex-col gap-4 w-full lg:w-1/4">
              <h3 className="text-base font-bold text-white">Tài nguyên học tập</h3>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <a href="#" className="flex items-center gap-2 text-sm text-[#9ca3af] hover:text-white transition-colors">
                    <img
                      src="/images_v2/img_svg_blue_gray_300.svg"
                      alt=""
                      className="w-4 h-4"
                    />
                    Video hướng dẫn
                  </a>
                </li>
                <li className="relative">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-[#9ca3af] hover:text-white transition-colors mt-4">
                      <img
                        src="/images_v2/img_vector_blue_gray_300_v2.svg"
                        alt=""
                        className="w-4 h-4"
                      />
                      Mẫu ngành
                    </div>
                    <a href="#" className="flex items-center gap-2 text-sm text-[#9ca3af] hover:text-white transition-colors mt-4">
                      <img
                        src="/images_v2/img_svg_blue_gray_300_16x16.svg"
                        alt=""
                        className="w-4 h-4"
                      />
                      Hướng dẫn thiết lập
                    </a>
                  </div>

                </li>
              </ul>
            </div>

            {/* Support Section */}
            <div className="flex flex-col gap-4 w-full lg:w-1/4">
              <h3 className="text-base font-bold text-white">Hỗ trợ</h3>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <a href="mailto:support@flashbot.vn" className="flex items-center gap-2 text-sm text-[#9ca3af] hover:text-white transition-colors">
                    <img
                      src="/images_v2/img_svg_16x16.svg"
                      alt=""
                      className="w-4 h-4"
                    />
                    support@flashbot.vn
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-base text-[#9ca3af] hover:text-white transition-colors">
                    <img
                      src="/images_v2/img_vector_blue_gray_300_12x12.svg"
                      alt=""
                      className="w-4 h-4 ml-0.5"
                    />
                    Trợ giúp trò chuyện trực tiếp
                  </a>
                </li>
                <li className="relative">
                  <a href="#" className="flex items-center gap-2 text-base text-[#9ca3af] hover:text-white transition-colors">
                    <img
                      src="/images_v2/img_svg_1.svg"
                      alt=""
                      className="w-4 h-4"
                    />
                    Nhóm cộng đồng
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-[#1f2937] pt-8">
            <p className="text-sm text-[#9ca3af] text-center">
              © 2025 Trung tâm học tập FlashBot. Nắm vững chatbot AI trong 30 phút.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;