'use client';

import { Avatar, Typography, Space, Dropdown, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Customer } from '@/libs/types';

const { Text } = Typography;

export default function UserActions({ user }: { user: Customer }) {
  const pathname = usePathname();
  const isProfile = pathname.includes('/learn/profile');

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

  return (
    <div className="px-3 py-2">
      <Dropdown
        menu={{ items }}
        trigger={['click', 'hover']}
        placement="bottomRight"
        arrow
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <a href={isProfile ? '#!' : '/learn/profile'}>
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
  );
}
