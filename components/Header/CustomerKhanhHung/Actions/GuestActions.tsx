'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function GuestActions() {

    const router = useRouter()
    const navigation = (key:string)=>{
        router.push(key)
    }

    return (
        <div className="flex gap-2">
            <div onClick={()=>navigation("/login")} className="cursor-pointer bg-[linear-gradient(90deg,#22c55e_0%,#059669_100%)] text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-[#e0e0e0] transition-colors">
                <span className="text-nowrap cursor-pointer">Đăng nhập</span>
            </div>
            <div onClick={()=>navigation("/login")} className="btn_register_mobile flex-col text-[1.2rem] cursor-pointer">
                <p className="text-nowrap text-center text-white">Học ngay</p>
                <p className="text-nowrap uppercase text-center text-white">Hoàn toàn miễn phí</p>
            </div>
            
        </div>
    );
}
