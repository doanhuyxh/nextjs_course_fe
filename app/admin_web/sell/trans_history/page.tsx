'use client';

import { useCallback, useEffect, useState } from "react";
import { Order } from "@/libs/types";
import axiosInstance from "@/libs/configs/ApiConfig/axiosAdminConfig";
import { convertUtcToLocalTime } from "@/libs/utils/index";
import { useRouter } from "next/navigation";
import { Table, Input, Button, Pagination, Space, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function TransHistoryPage() {
    const [loading, setLoading] = useState(true);
    const [totalResult, setTotalResult] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [orderData, setOrderData] = useState<Order[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const router = useRouter();

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys, rows) => {
            setSelectedRowKeys(keys);
        },
    };

    // const handleViewCustomer = (id: string) => {
    //     router.push(`/admin_web/sell/trans_history/detail?id=${id}`);
    // };

    const fetchOrderData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance(
                `/orders?page=${page}&pageSize=${pageSize}&search_keyword=${searchKeyword}&search_date=${searchDate}`);
            setOrderData(response.data.data);
            setTotalResult(response.data.totalResult);
        } catch {
            setOrderData([]);
            setTotalResult(0);
        } finally {
            setLoading(false);
        }
    }, [page, searchKeyword, pageSize, searchDate]);

    useEffect(() => {
        fetchOrderData();
    }, [page, searchKeyword, pageSize, fetchOrderData]);

 
    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            render: (_: any, __: any, index: number) => (page - 1) * pageSize + index + 1,
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Gói",
            dataIndex: "plan",
        },
        {
            title: "Số tháng",
            dataIndex: "numberOfMonths",
        },
        {
            title: "Số tiền",
            dataIndex: "total",
        },
        {
            title: "Trạng thái",
            dataIndex: "paymentStatus",
        },
        {
            title: "Ngày tham gia",
            dataIndex: "createdAt",
            render: (createdAt: string) => convertUtcToLocalTime(createdAt),
        },
    ];

    return (
        <div className="">

            {/* <div className="flex gap-2 mb-3 bg-white p-3 rounded-lg overflow-auto text-nowrap">
                <button className={`px-3 py-1 ${typeUser == "all" ? "bg-green-500" : "bg-gray-400"} rounded text-white`} onClick={() => setTypeUser("all")}>
                    All ({countUser?.all || 0})
                </button>

                {MemberType.map((type) => (
                    <button
                        key={type.value || type.label}
                        className={`px-3 py-1 rounded ${typeUser == type.value ? "bg-green-500" : "bg-gray-400"} text-white`}
                        onClick={() => setTypeUser(type.value)}
                    >
                        {type.label} ({countUser?.[type.value] || 0})
                    </button>
                ))}
                <button className={`px-3 py-1 rounded ${typeUser == "watched_5_videos" ? "bg-green-500" : "bg-gray-400"} text-white`} onClick={() => setTypeUser("watched_5_videos")}>
                    Học trên 5 video ({countUser?.learning_5_videos || 0})
                </button>

                <button className={`px-3 py-1 rounded ${typeUser == "verified" ? "bg-green-500" : "bg-gray-400"} text-white`} onClick={() => setTypeUser("verified")}>
                    Đã xác thực ({countUser?.Verified || 0})
                </button>

                <button className={`px-3 py-1 rounded ${typeUser == "not_verify" ? "bg-green-500" : "bg-gray-400"} text-white`} onClick={() => setTypeUser("not_verify")}>
                    Chưa xác thực ({countUser?.NotVerified || 0})
                </button>

            </div> */}


            <div className="flex flex-wrap gap-2 justify-between mb-3 p-3 bg-white rounded-lg">
                <div className="flex space-x-3">
                    <DatePicker onChange={(e) => {
                        setSearchDate(e?.format('YYYY-MM-DD') || '')
                    }} />

                    <Input
                        placeholder="Tìm kiếm khách hàng: Tên, Email, Số điện thoại"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="min-w-[200px] lg-min-w-[350px]"
                        suffix={<SearchOutlined />}
                    />
                </div>
            </div>

            <Table
                loading={loading}
                dataSource={orderData && orderData.map((order) => ({
                    ...order,
                    key: order.id,
                }))}
                columns={columns}
                pagination={false}
                size="middle"
                bordered
                scroll={{ x: "max-content" }}
                rowSelection={rowSelection}
            />
            <div className="flex justify-end">
                <Pagination
                    current={page}
                    total={totalResult}
                    pageSize={pageSize}
                    onChange={(page) => setPage(page)}
                    defaultPageSize={1}
                    showQuickJumper
                    showSizeChanger
                    onShowSizeChange={(current, size) => setPageSize(size)}
                    pageSizeOptions={["10", "20", "50", "100"]}
                    style={{ marginTop: "16px", textAlign: "right" }}
                />
            </div>

            {/* <Modal
                title="Thêm học viên"
                className="text-center"
                open={showModalAddUser}
                cancelText="Hủy bỏ"
                okText="Đồng ý"
                onOk={handleSaveNewUser}
                onCancel={() => {
                    setNewUser({
                        email: "",
                        password: "",
                        firstName: "",
                        lastName: "",
                    });
                    setShowModalAddUser(false)
                }}
            >
                <div className="flex flex-col gap-3">
                    <Input placeholder="Họ" value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
                    <Input placeholder="Tên" value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
                    <Input placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                    <Input placeholder="Mật khẩu" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                </div>
            </Modal>

            <Modal
                title="Gửi mail hàng loạt"
                className="text-center"
                open={showModalSendMail}
                cancelText="Hủy bỏ"
                okText="Gửi ngay"
                onOk={handleSendEmail}
                onCancel={() => setShowModalSendMail(false)}
            >
                <div className="flex flex-col gap-3">
                    <Select placeholder="Chọn mẫu email" onChange={(value) => setSelectedTemplate(value)}>
                        {listTemplate.map((template) => (
                            <Option key={template.id} value={template.id}>
                                {template.name}
                            </Option>
                        ))}
                    </Select>

                </div>
            </Modal> */}
        </div>
    );
}
