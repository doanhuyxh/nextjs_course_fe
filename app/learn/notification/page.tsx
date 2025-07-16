'use client'

import axiosCustomerConfig from "@/libs/configs/ApiConfig/axiosCustomerConfig";
import { formatTime } from "@/libs/utils/index";
import { NotificationItem } from "@/libs/types";
import { useState, useEffect, useCallback } from "react";
import { Button, Modal, Table, Tag, Typography, Pagination, Space, Segmented, Skeleton } from "antd";

const { Text } = Typography;

export default function Notification() {
    const [status, setStatus] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<NotificationItem[]>([]);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [totalResult, setTotalResult] = useState<number>(0);
    const [totalNotification, setTotalNotification] = useState({ read: 0, unread: 0 });

    const [isClient, setIsClient] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handlePageChange = (page: number) => {
        setPage(page);
    }

    const GetNotification = useCallback(async () => {
        const res = await axiosCustomerConfig.get(`/notification/get-mail?page=${page}&status=${status}`);
        setData(res.data?.data);
        setTotalPage(res.data?.totalPage);
        setTotalResult(res.data?.totalResult);
    }, [page, status]);

    const GetTotalNotification = useCallback(async () => {
        const res = await axiosCustomerConfig.get(`/notification/get-total-mail`);
        setTotalNotification({
            read: res.data?.total_read,
            unread: res.data?.total_un_read
        });
    }, []);

    const handleViewDetail = (item: NotificationItem) => {
        setTitle(item.title);
        setContent(item.content);
        setIsOpen(true);
        setData(data.map(notification =>
            notification.messId === item.messId
                ? { ...notification, status: "read" }
                : notification
        ));

        if (item.status === "un_read") {
            axiosCustomerConfig.get(`/notification/update-mail?mailId=${item.messUserId}`);
        }
    }

    useEffect(() => {
        GetNotification();
        GetTotalNotification();
    }, [page, status, GetNotification, GetTotalNotification]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (_: any, __: NotificationItem, index: number) => index + 1,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (title: string) => <Text strong>{title}</Text>,
        },
        {
            title: 'Nội dung',
            key: 'content',
            render: (_: any, item: NotificationItem) => (
                <Button type="link" onClick={() => handleViewDetail(item)}>
                    Xem chi tiết
                </Button>
            )
        },
        {
            title: 'Thời gian gửi',
            dataIndex: 'sendAt',
            key: 'sendAt',
            render: (sendAt: string) => formatTime(sendAt),
        },
        {
            title: 'Thời gian xem',
            dataIndex: 'readAt',
            key: 'readAt',
            render: (_: string, item: NotificationItem) => item.status === "read" ? formatTime(item.readAt) : "-",
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (_: any, item: NotificationItem) =>
                item.status === "read" ? (
                    <Tag color="green">Đã xem</Tag>
                ) : (
                    <Tag color="red">Chưa xem</Tag>
                )
        }
    ];

    if (!isClient) {
        return (
            <div className="w-full max-w-xl mx-auto px-4 py-8">
                <Typography.Title level={2} className="text-center text-color-secondary">
                    Thông báo
                </Typography.Title>
                <Skeleton active paragraph={{ rows: 4 }} />
            </div>
        );
    };

    return (
        <div className="lg:mt-5 w-full px-4 py-8 max-w-7xl mx-auto bg-white shadow-md rounded-lg">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-blue-600">Thông báo của bạn</h1>
            </div>

            <div className="mb-6 flex flex-wrap gap-4 justify-center">
                <Segmented
                    options={[
                        {
                            label: (
                                <Space>
                                    <span>Tất cả</span>
                                    <Tag color="red">{totalNotification.read + totalNotification.unread}</Tag>
                                </Space>
                            ),
                            value: "",
                        },
                        {
                            label: (
                                <Space>
                                    <span>Đã xem</span>
                                    <Tag color="green">{totalNotification.read}</Tag>
                                </Space>
                            ),
                            value: "read",
                        },
                        {
                            label: (
                                <Space>
                                    <span>Chưa xem</span>
                                    <Tag color="red">{totalNotification.unread}</Tag>
                                </Space>
                            ),
                            value: "un_read",
                        },
                    ]}
                    value={status}
                    onChange={(val) => setStatus(val as string)}
                />
            </div>

            <Table
                dataSource={data}
                columns={columns}
                rowKey="messId"
                pagination={false}
                scroll={{ x: true }}
                locale={{ emptyText: 'Không có thông báo nào' }}
            />

            <div className="flex justify-center mt-6">
                <Pagination
                    current={page}
                    total={totalResult}
                    pageSize={30}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>

            <Modal
                title={title}
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                footer={null}
                width={800}
            >
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </Modal>
        </div>
    )
}
