import Button from '@/components/Button';
import Link from "next/link";

export default function Pc() {
    return (
        <div className="flex flex-col justify-center gap-6 sm:gap-7 md:gap-8 w-full lg:w-1/2 tranform lg:translate-y-[-4%]">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-bold leading-tight text-white text-center lg:text-left" style={{ lineHeight: '60px' }}>
                <span className="text-white">Bắt đầu xây dựng </span>
                <p className="text-[#fde047]">Chatbot 24/7</p>
                <span className="text-white"> của bạn chỉ trong 30 phút</span>
            </h1>
            <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-6 sm:gap-7">
                <p className="lg:text-[23px] sm:text-xl md:text-2xl leading-relaxed" style={{ lineHeight: '32px' }}>
                    <span className="text-[#dbeafe]">FlashBot giúp bạn phục vụ khách hàng cả ngày lẫn đêm. Học cách thiết lập từng bước - </span>
                    <span className="text-[#fde047]">không cần kỹ thuật, ai cũng làm được.</span>
                </p>
                <Link href="/study">
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
                </Link>
                <div className="flex flex-wrap flex-col lg:flex-row lg:flex-nowrap items-center gap-4 sm:gap-6 md:gap-8">
                    <div className="flex items-center gap-2">
                        <img src="/images_v2/img_svg_green_400.svg" alt="" className="w-4 h-4" />
                        <span className="text-xs sm:text-sm text-[#bfdbfe] lg:text-nowrap">Video hướng dẫn từng bước</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="/images_v2/img_svg_green_400.svg" alt="" className="w-4 h-4" />
                        <span className="text-xs sm:text-sm text-[#bfdbfe] lg:text-nowrap">Không cần lập trình</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="/images_v2/img_svg_green_400.svg" alt="" className="w-4 h-4" />
                        <span className="text-xs sm:text-sm text-[#bfdbfe] lg:text-nowrap">Đã bao gồm mẫu theo từng ngành</span>
                    </div>
                </div>
            </div>
        </div>
    );
}