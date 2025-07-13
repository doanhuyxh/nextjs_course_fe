'use client';

import './index.css'
import Image from "next/image";
import {useEffect, useState} from 'react';
import axiosCustomerConfig from "@/libs/configs/ApiConfig/axiosCustomerConfig";
export default function Footer(){
    const [logo, setLogo] = useState<string>('')
    useEffect(()=>{
        axiosCustomerConfig.get("/public/social-key?key=logo")
            .then(res=>{
                setLogo(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },[])

    return (
        <footer className="relative">
            <div className="absolute w-full h-full bg-black opacity-60 z-[-1]"></div>
            <div className="container py-20 px-4 m-auto flex flex-col lg:flex-row lg:justify-evenly gap-10 z-10">

                <div className="flex flex-col gap-2">
                    {logo && <Image src={logo} alt={"logo"} width={100} height={100}/>}
                    <p className="font-[300] text-white text-[17px] max-w-[300px]">
                        vuacontent là trang hướng dẫn ‘viết quảng cáo chuyển đổi‘ kiếm tiền NGAY.
                        Nó được thiết kế dành riêng cho người kinh doanh đang muốn bùng nổ doanh số đơn hàng!
                    </p>
                    <hr className="w-full h-1 bg-white"/>
                </div>


                <div className="flex flex-col gap-4">
                    <p className="text-white underline font-bold text-[18px]">Liên hệ với tôi</p>
                    <p className="text-white">
                        <i aria-hidden="true" className="fas fa-phone text-[#26A5BE]"></i> {": "} 0817.726.406
                    </p>
                    <a href='mailto:hotro.vuacontent@gmail.com' className="text-white">
                        <i aria-hidden="true" className="fas fa-envelope text-[#26A5BE]"></i> {": "} hotro.vuacontent@gmail.com
                    </a>
                    <p className="text-white">
                        <i aria-hidden="true" className="fas fa-home text-[#26A5BE]"></i> {": "} An Vượng - Hà Đông - Hà Nội
                    </p>

                </div>
            </div>
        </footer>
    )
}