"use client"

import React, { ReactNode } from "react";
import { ConfigProvider } from 'antd';
import '@ant-design/v5-patch-for-react-19';

export default function ClientLayout({ children }: { children: ReactNode }) {
    return (
        <ConfigProvider theme={{}} warning={{ strict: false }}>
            {children}
        </ConfigProvider>
    );
}