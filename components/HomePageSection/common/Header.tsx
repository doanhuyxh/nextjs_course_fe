'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

const Header: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleStudy = () => {
    router.push('/study');
  }

  return (
    <header className="w-full bg-white shadow-[0px_1px_2px_#0000000c] p-4 h-[72px]">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="flex items-end gap-2">
              <div className="relative w-9 h-9">
                <img
                  src="/images_v2/img_svg.svg"
                  alt="FlashBot Logo"
                  className="w-full h-full"
                />
                <div className="absolute top-0 right-0 w-3 h-3 bg-[#22c55e] rounded-full"></div>
              </div>
              <h1 className="text-lg md:text-xl font-bold text-[#111827]">
                FlashBot
              </h1>
              <Button
                variant="gradient"
                className=" text-xs !h-[28px] !text-nowrap !rounded-2xl"
              >
                Trung tâm học tập
              </Button>
            </div>
          </div>

         
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <Button
              onClick={handleStudy}
              variant="primary"
              className="bg-[linear-gradient(90deg,#22c55e_0%,#059669_100%)] rounded-xl !h-[40px] p-[11.8px 10px 12px 24px]"
              leftImage={{
                src: "/images_v2/img_svg_white_a700.svg",
                width: 16,
                height: 16
              }}
            >
              Xem hướng dẫn
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <nav className={`${menuOpen ? 'block' : 'hidden'} lg:hidden mt-4 pt-4 border-t border-gray-200`}>
          <Button
            onClick={handleStudy}
            variant="primary"
            className="w-full bg-[linear-gradient(90deg,#22c55e_0%,#059669_100%)] rounded-xl !h-[40px] !p-[11.8px 10px 12px 24px]"
            leftImage={{
              src: "/images_v2/img_svg_white_a700.svg",
              width: 16,
              height: 16
            }}
          >
            Xem hướng dẫn
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;