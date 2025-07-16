'use client';

import React from 'react';
import Image from 'next/image';
import { Customer } from '@/libs/types';

export default function UserDropdown({ isDropdown, user, setIsDropdown }: { isDropdown: boolean, user: Customer, setIsDropdown: React.Dispatch<React.SetStateAction<boolean>> }) {

    const handleLogout = () => {
        sessionStorage.clear()
        localStorage.clear()
        document.cookie = ""
        window.location.href = "/"
    }

    return (
        <div
            onMouseLeave={() => setIsDropdown(false)}
            className={`transition-all duration-300 absolute top-24 z-99999 ${isDropdown ? 'dropdown_menu' : 'hidden'}`}
        >
            <ul className="bg-white shadow-lg rounded-lg py-2">
                <li>
                    <a href="/learn/profile" className="flex items-center gap-2 px-5 py-3">
                        <div className="flex justify-center align-middle items-center transform translate-y-[-8px] w[20px]">
                            <Image src="/assets/images/header/user-icon.svg" alt="profile" width={20} height={20} />
                        </div>
                        <div className="text-nowrap text-xl flex flex-col gap-2 cursor-pointer">
                            <span className="text-gray-500 font-semibold">Mã khách hàng:</span>
                            <p className="text-black font-medium flex items-center gap-2">
                                {user?.code || ""}
                                <span>
                                    <Image src="/assets/images/header/tag-icon.svg" alt="copy" width={15} height={15} />
                                </span>
                            </p>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="/learn/change-password" className="flex items-center gap-2 px-5 py-3">
                        <div className="flex justify-center transform w-[20px] cursor-pointer">
                            <Image src="/assets/images/header/key-icon.svg" alt="profile" width={15} height={15} />
                        </div>
                        <div className="text-nowrap text-xl flex flex-col gap-2">
                            <p className="text-gray-500 font-semibold cursor-pointer">Đổi mật khẩu</p>
                        </div>
                    </a>
                </li>
                <li>
                    
                </li>
                <li className='logout_btn'>
                    <div onClick={handleLogout} className="flex items-center gap-2 px-5 py-3 cursor-pointer">
                        <div className="flex justify-center text-gray-500">
                            <Image src="/assets/images/header/window.svg" alt="profile" width={15} height={15} />
                        </div>
                        <div className="text-nowrap text-xl flex flex-col gap-2">
                            <p className="text-[#f04438] font-semibold cursor-pointer">Đăng xuất</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}
