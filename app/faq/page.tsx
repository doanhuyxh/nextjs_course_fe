import '@/styles/home_khanh_hung.css'

import dynamic from "next/dynamic";
const Header = dynamic(() => import('@/components/Header/CustomerKhanhHung'));
import Footer from "@/components/Footer/Borntowrite";

const Component = dynamic(() => import('./_component_feature_khahung'));

export default function FaqBorntowrite() {


    return (
        <div className="bg-[#710EBE]">
            <Header />
            <div className="w-full h-full pt-20">
                <div className="w-full h-10"></div>
                <Component/>
            </div>
            <Footer/>
        </div>
    )
}