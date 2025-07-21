
"use client";
import Link from "next/link";
import Button from '@/components/Button';
import { useIsMobile } from "@/libs/hooks/use-mobile";
import { useEffect, useState } from "react";

export default function ButtonOverlay() {
    const isMobile = useIsMobile();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!isMobile) return;

        const handleScroll = () => {
            const section2 = document.getElementById("problems-and-solutions");
            if (!section2) return;

            const rect = section2.getBoundingClientRect();

            // Khi top của section 2 nằm trên đỉnh màn hình, nghĩa là đã lướt qua
            const passed = rect.top <= 0;

            setVisible(passed);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Kiểm tra ngay khi component mount

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, [isMobile]);

    if (!isMobile) {
        return null;
    }

    return (
        <>
            {visible && <div className="w-full fixed bottom-0 left-0 z-50 bg-transparent shadow-lg flex items-center justify-center p-4">
                <Link href="/study" className="m-auto">
                    <Button
                        variant="primary"
                        size="xl"
                        className="bg-[linear-gradient(90deg,#22c55e_0%,#059669_100%)] rounded-xl shadow-[0px_8px_10px_#00000019] w-fit !p-[17.27px 13.76px 18.73px 32px] transform animate-bounce transition-transform duration-300 ease-in-out"
                        leftImage={{
                            src: "/images_v2/img_svg_white_a700_24x24.svg",
                            width: 24,
                            height: 24
                        }}
                    >
                        Xem hướng dẫn ngay
                    </Button>
                </Link>
            </div>}
        </>
    );
}
