"use client";

import { useIsMobile } from '@/libs/hooks/use-mobile';
import AuthTabsV2 from '../AuthTabsV2/index';
import Pc from './pc';
import Mobile from './mobile';

export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <section className="w-full bg-[linear-gradient(173deg,#3b82f6_0%,#4f46e5_50%,#6d28d9_100%)] py-16 sm:py-20 md:py-24 lg:py-32 tranform transition-all duration-500">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
          {/* Left Content */}
          {!isMobile && <Pc />}
          {isMobile && <Mobile />}
          {/* Right Content - Tutorial Progress Card */}
          <div className="w-full" id='auth-tabs-v2'>
            <div className="bg-[#ffffff19] border border-[#ffffff33] rounded-2xl lg:w-[600px] lg:p-6 p-3 shadow-[0px_4px_4px_#888888ff]" id='auth-tabs-v2-container'>
              <AuthTabsV2 />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}