'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Customer } from "@/libs/types";
import { useSearchParams, usePathname } from "next/navigation";
import fetchData from "@/libs/configs/ApiConfig/fetchDataServer";
import Link from "next/link";
import { Avatar, Typography, Space, Dropdown, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { Text } = Typography;



const HeaderStudy = () => {
    const [user, setUser] = React.useState<Customer>({} as Customer);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [logo, setLogo] = React.useState<string>("/favicon.png");
    const pathname = useSearchParams();
    const path = usePathname();

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        document.cookie = '';
        window.location.href = '/';
    };

    const items: MenuProps['items'] = [
        {
            key: 'profile',
            label: (
                <a href="/learn/profile">
                    <Space direction="vertical" size={0}>
                        <Text type="secondary" strong>Mã khách hàng:</Text>
                        <Text>
                            {user?.code || ''}
                            <Image
                                src="/assets/images/header/tag-icon.svg"
                                alt="copy"
                                width={15}
                                height={15}
                                style={{ marginLeft: 6 }}
                            />
                        </Text>
                    </Space>
                </a>
            ),
            icon: (
                <Image
                    src="/assets/images/header/user-icon.svg"
                    alt="profile"
                    width={20}
                    height={20}
                />
            ),
        },
        {
            key: 'change-password',
            label: (
                <a href="/learn/change-password">
                    <Text>Đổi mật khẩu</Text>
                </a>
            ),
            icon: (
                <Image
                    src="/assets/images/header/key-icon.svg"
                    alt="change-password"
                    width={16}
                    height={16}
                />
            ),
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: (
                <Text type="danger" onClick={handleLogout}>
                    Đăng xuất
                </Text>
            ),
            icon: (
                <Image
                    src="/assets/images/header/window.svg"
                    alt="logout"
                    width={16}
                    height={16}
                />
            ),
        },
    ];


    useEffect(() => {
        const accessToken = localStorage.getItem("AccessToken");
        fetchData("/customer/get-info", accessToken || "")
            .then((res: any) => {
                const code = res.code;
                if (code === 200) {
                    setUser(res.data);
                    sessionStorage.setItem("user", JSON.stringify(res.data));
                }
            });
    }, [path, pathname]);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <></>;
    }

    return (
        <div className="w-full bg-white shadow-lg flex items-center justify-between position-sticky top-0 z-50">
            <div className="px-3 py-2">
                {logo && <Link href="/learn/profile">
                    <span>
                        {logo && <Image src={logo} alt="logo" width={60} height={60} />}
                    </span>
                </Link>}
            </div>
            <div className="px-3 py-2">
                <Dropdown
                    menu={{ items }}
                    trigger={['click', 'hover']}
                    placement="bottomRight"
                    arrow
                >
                    <div className="flex items-center gap-2 cursor-pointer">
                        <a href={'/learn/profile'}>
                            <Avatar
                                src={user?.avatar || '/assets/images/avatar_defaut.jpg'}
                                size={40}
                            />
                        </a>
                        <div className="hidden sm:flex flex-col items-start">
                            <Space size={4}>
                                <Text strong>
                                    {`${user?.firstName || ''} ${user?.lastName || ''}`}
                                </Text>
                                {user?.type === 'free' && (
                                    <span className="flex items-center gap-1 px-2 py-0.5 bg-green-600 text-white text-xs rounded-md">
                                        <Image
                                            src="/assets/images/ic-tag-free.svg"
                                            width={16}
                                            height={16}
                                            alt="free-tag"
                                        />
                                        Free
                                    </span>
                                )}
                            </Space>
                        </div>
                        <DownOutlined />
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}

export default HeaderStudy;
