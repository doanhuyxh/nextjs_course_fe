'use client';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-[0px_1px_2px_#0000000c] p-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="flex items-end gap-2">
              <div className="relative w-9 h-9">
                <img 
                  src="/images/img_svg.svg" 
                  alt="FlashBot Logo" 
                  className="w-full h-full"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#22c55e] rounded-full"></div>
              </div>
              <h1 className="text-lg md:text-xl font-bold text-[#111827]">
                FlashBot
              </h1>
              <Button
                variant="gradient"
                size="xs"
                className="rounded-[14px] px-2 py-1.5 text-xs"
              >
                Trung tâm học tập
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="block lg:hidden p-2" 
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <Button
              variant="primary"
              size="md"
              className="bg-[linear-gradient(90deg,#22c55e_0%,#059669_100%)] rounded-xl px-4 py-2"
              leftImage={{
                src: "/images/img_svg_white_a700.svg",
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
            variant="primary"
            size="md"
            className="w-full bg-[linear-gradient(90deg,#22c55e_0%,#059669_100%)] rounded-xl"
            leftImage={{
              src: "/images/img_svg_white_a700.svg",
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