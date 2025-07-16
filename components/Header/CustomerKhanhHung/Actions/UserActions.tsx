'use client';

import { useState } from 'react';
import Image from 'next/image';
import UserDropdown from './UserDropdown';
import { Customer } from '@/libs/types';
import { usePathname } from 'next/navigation';
import { Avatar } from 'antd';


export default function UserActions({ user }: { user: Customer }) {
    const [isDropdown, setIsDropdown] = useState(false);
    const pathname = usePathname();
    const isProfile = pathname.includes('/learn/profile');

    return (

        <div className="p-4">
            <div className="flex gap-3 items-center cursor-pointer"
                onMouseEnter={() => setIsDropdown(true)}
                onClick={() => setIsDropdown(!isDropdown)}>
                <a href={isProfile ? "#!" : "/learn/profile"} className="cursor-pointer">
                    <Avatar src={user?.avatar || '/assets/images/avatar_defaut.jpg'} size={36} />
                </a>
                <div className="cursor-pointer">
                    {user?.type == 'free' &&
                        <div className="flex gap-2 text-nowrap text-black font-bold text-xl">
                            <p className='cursor-pointer'>{(user?.firstName + " " + user?.lastName) || ""}</p>
                            <span className='flex items-center justify-center gap-1 px-2 text-nowrap bg-green-600 text-white rounded'>
                                <img src={'/assets/images/ic-tag-free.svg'} width={25} height={25} alt='' />
                                Free
                            </span>
                        </div>}
                </div>
                <div className={`icon_dropdown transition-all duration-300 cursor-pointer w-[20px] `}>
                    <Image src="/assets/images/arrow-02.png" alt="dropdown" width={20} height={20} className={`${isDropdown ? 'rotate-180' : ''}`} />
                </div>
            </div>
            <UserDropdown isDropdown={isDropdown} setIsDropdown={setIsDropdown} user={user} />
        </div>

    );
}
