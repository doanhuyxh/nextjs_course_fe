'use client';

import { Table, Tag, Select, DatePicker, Popconfirm, Button, Input, Space } from 'antd';
import React, { useEffect, useState, useCallback } from 'react';
import axiosInstance from "@/libs/configs/ApiConfig/axiosAdminConfig";
import { ResponseData, Customer, TemplateMail } from "@/libs/types";
import { formatTime, convertUtcToLocalTime } from "@/libs/utils/index";
import dayjs from "dayjs";
import { SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import debounce from 'lodash/debounce';
import { useStyle } from '@/libs/antd-style-cache'

const { Option } = Select;

export default function Histories() {
    const { styles } = useStyle();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [templates, setTemplates] = useState<TemplateMail[]>([]);
    const [users, setUsers] = useState<Customer[]>([]);
    const [pageSize, setPageSize] = useState(10);
    const [page, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [status, setStatus] = useState("");
    const [searchText, setSearchText] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const columns: ColumnsType<any> = [
        {
            title: 'Người nhận',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (fullName) => fullName || 'Không có',
            width: 200,
        },
        {
            title: 'Email nhận',
            dataIndex: 'userEmail',
            key: 'userEmail',
            render: (userEmail) => userEmail || 'Không có',
            width: 230,
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => formatTime(convertUtcToLocalTime(text)),
            width: 200,
        },
        {
            title: 'Khung giờ gửi',
            dataIndex: 'sendAt',
            key: 'sendAt',
            render: (text) => (text ? formatTime(convertUtcToLocalTime(text)) : 'Chưa gửi'),
            width: 200,
        },
        {
            title: 'Thời gian xem',
            dataIndex: 'readAt',
            key: 'readAt',
            render: (_, record) => record.isRead ? formatTime(convertUtcToLocalTime(record.readAt)) : 'Chưa xem',
            width: 200,
        },
        {
            title: 'Mẫu mail',
            dataIndex: 'templateMailName',
            key: 'templateMailName',
            width: 300,
            ellipsis: true,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const statusConfig = {
                    pending: { color: 'orange', label: 'Đang chờ' },
                    success: { color: 'green', label: 'Thành công' },
                    failed: { color: 'red', label: 'Thất bại' },
                };
                const config = statusConfig[status] || { color: 'red', label: status || 'Không xác định' };
                return <Tag color={config.color}>{config.label}</Tag>;
            },
            width: 100,
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Xác nhận xóa lịch sử"
                    description="Hành động này không thể hoàn tác."
                    okText="Xóa"
                    cancelText="Hủy"
                    onConfirm={() => handleDeleteHistory(record.id)}
                >
                    <Button danger size="small">Xóa</Button>
                </Popconfirm>
            ),
            width: 120,
        },
    ];

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((value) => {
            setSearchText(value);
            setCurrentPage(1);
        }, 500),
        []
    );

    const handleSearch = (e) => {
        debouncedSearch(e.target.value);
    };

    const handlePageSizeChange = (value) => {
        setPageSize(value);
        setCurrentPage(1);
    };

    const handleStatusChange = (value) => {
        setStatus(value);
        setCurrentPage(1);
    };

    const handleStartDateChange = (date, dateString) => {
        setStartDate(date ? dayjs(dateString).format("YYYY-MM-DD HH:mm") : '');
        setCurrentPage(1);
    };

    const handleEndDateChange = (date, dateString) => {
        setEndDate(date ? dayjs(dateString).format("YYYY-MM-DD HH:mm") : '');
        setCurrentPage(1);
    };

    const getHistorySendEmail = useCallback(async () => {
        try {
            setLoading(true);
            const res: ResponseData = await axiosInstance.get(
                `/email/get-history-send-email?page=${page}&pageSize=${pageSize}&startTime=${startDate}&endTime=${endDate}&status=${status}&search=${searchText}`
            );
            if (res.code === 200 && Array.isArray(res.data.data)) {
                setData(res.data.data.map((item, index) => ({ ...item, key: index })));
                setTotalItems(res.data.total);
            }
        } catch (error) {
            console.error("Lỗi khi lấy lịch sử gửi email:", error);
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, startDate, endDate, status, searchText]);

    const getTemplate = async () => {
        try {
            const res: ResponseData = await axiosInstance.get(`/email/get-all-template-email?page=1&pageSize=3000`);
            if (res.code === 200 && Array.isArray(res.data)) {
                setTemplates(res.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy mẫu email:", error);
        }
    };

    const getUsers = async () => {
        try {
            const res: ResponseData = await axiosInstance.get(`/staff_manager/get-all-customer?page=1&pageSize=3000`);
            if (res.code === 200 && Array.isArray(res.data)) {
                setUsers(res.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
        }
    };

    const handleDeleteHistory = async (id: string) => {
        try {
            const res: ResponseData = await axiosInstance.get(`/email/delete-history-send-email?id=${id}`);
            if (res.code === 200) {
                getHistorySendEmail();
            }
        } catch (error) {
            console.error("Lỗi khi xóa lịch sử gửi email:", error);
        }
    };

    useEffect(() => {
        document.title = "Lịch sử gửi mail";
        getTemplate();
        getUsers();
    }, []);

    useEffect(() => {
        getHistorySendEmail();
    }, [getHistorySendEmail]);

    return (
        <div className="w-full p-3 bg-white rounded-lg shadow-lg mx-2 my-2">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Lịch sử gửi mail</h1>

            <div className="mb-6 flex flex-wrap gap-4">
                <Space wrap>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-nowrap">Tìm kiếm:</span>
                        <Input
                            placeholder="Tìm theo tên hoặc email"
                            prefix={<SearchOutlined />}
                            onChange={handleSearch}
                            className="w-58"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">Trạng thái:</span>
                        <Select
                            value={status}
                            onChange={handleStatusChange}
                            className="w-32"
                            allowClear
                            placeholder="Chọn trạng thái"
                        >
                            <Option value="">Tất cả</Option>
                            <Option value="pending">Đang chờ</Option>
                            <Option value="success">Thành công</Option>
                            <Option value="error">Thất bại</Option>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">Số dòng:</span>
                        <Select
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            className="w-24"
                        >
                            <Option value={5}>5</Option>
                            <Option value={10}>10</Option>
                            <Option value={25}>25</Option>
                            <Option value={50}>50</Option>
                            <Option value={100}>100</Option>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">Từ ngày:</span>
                        <DatePicker
                            format="DD-MM-YYYY"
                            onChange={handleStartDateChange}
                            className="w-48"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">Đến ngày:</span>
                        <DatePicker
                            format="DD-MM-YYYY"
                            onChange={handleEndDateChange}
                            className="w-48"
                            value={endDate ? dayjs(endDate) : null}
                            disabledDate={(current) =>
                                !!startDate && current.isBefore(dayjs(startDate), 'day')
                            }
                        />
                    </div>
                </Space>
            </div>

            <Table
                loading={loading}
                dataSource={data}
                columns={columns}
                size="middle"
                className={styles.customTable}
                bordered
                pagination={{
                    current: page,
                    pageSize: pageSize,
                    total: totalItems,
                    onChange: (page, size) => {
                        setCurrentPage(page);
                        setPageSize(size);
                    },
                    showSizeChanger: false,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `Hiển thị ${range[0]}-${range[1]} trong ${total} mục`,
                }}
                scroll={{ x: '100%', y: 'max-content' }}
            />

        </div>
    );
}