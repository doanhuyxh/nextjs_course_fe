'use client';

import { useCallback, useEffect, useState } from "react";
import { Customer, MemberType } from "@/libs/types";
import axiosInstance from "@/libs/configs/ApiConfig/axiosAdminConfig";
import { convertUtcToLocalTime } from "@/libs/utils/index";
import { useRouter } from "next/navigation";
import { Table, Input, Button, Pagination, Avatar, Space, Popconfirm, Breadcrumb, DatePicker, Modal, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import moment from "moment";
import { handleRedirectAdmin } from "@/libs/hooks/useRedirect";
const { Option } = Select;

export default function CustomerPage() {
    const [loading, setLoading] = useState(true);
    const [totalResult, setTotalResult] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [customerData, setCustomerData] = useState<Customer[]>([]);
    const [typeUser, setTypeUser] = useState("all");
    const [countUser, setCountUser] = useState<any>()
    const [newUser, setNewUser] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });
    const [showModalAddUser, setShowModalAddUser] = useState(false);
    const [showModalSendMail, setShowModalSendMail] = useState(false);
    const [listTemplate, setListTemplate] = useState<any[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<string>('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const [isWaitingDelete, setIsWaitingDelete] = useState(false);
    const router = useRouter();

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys, rows) => {
            setSelectedRowKeys(keys);
        },
    };

    const handleViewCustomer = (id: string) => {
        router.push(`/admin_web/students/all/detail?id=${id}`);
    };

    const handleLoginBotChat = async (id: string) => {
        await handleRedirectAdmin(id, "train");
    };

    const handleDeleteCustomer = async (id: string) => {
        setIsWaitingDelete(true);
        try {
            await axiosInstance.get(`/customer/delete?id=${id}`);
            fetchCustomerData();
            toast.success("Xoá học viên thành công", {
                duration: 4000,
                style: {
                    backgroundColor: '#00cc00',
                    color: '#fff',
                }
            });
        } catch (error) {
            toast.error("Xoá học viên thất bại", {
                duration: 4000,
                style: {
                    backgroundColor: '#ff4444',
                    color: '#fff',
                }
            });
        } finally {
            setIsWaitingDelete(false);
        }
    };


    const fetchCustomerData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance(
                `/customer/get-all-customer?page=${page}&pageSize=${pageSize}&search_keyword=${searchKeyword}&type_user=${typeUser}&search_date=${searchDate}`);
            setCustomerData(response.data.data);
            setTotalResult(response.data.totalResult);
        } catch {
            setCustomerData([]);
            setTotalResult(0);
        } finally {
            setLoading(false);
        }
    }, [page, searchKeyword, pageSize, typeUser, searchDate]);


    const handleSaveNewUser = () => {
        axiosInstance.post("/customer/create-customer", newUser)
            .then((res: any) => {
                if (res.code === 200) {
                    toast.success("Thêm học viên thành công", {
                        duration: 4000,
                        style: {
                            backgroundColor: '#00cc00',
                            color: '#fff',
                        }
                    });
                    fetchCustomerData();
                } else {
                    toast.error("Thêm học viên thất bại", {
                        duration: 4000,
                        style: {
                            backgroundColor: '#ff4444',
                            color: '#fff',
                        }
                    });
                }

                setShowModalAddUser(false);
                setNewUser({
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                })
            });
    };

    const handleSendEmail = async () => {
        if (!selectedTemplate) {
            toast.error("Chưa chọn mẫu email", {
                duration: 4000,
                style: {
                    backgroundColor: '#ff4444',
                    color: '#fff',
                }
            });
            return;
        }

        if (selectedRowKeys.length === 0) {
            toast.error("Chưa chọn học viên", {
                duration: 4000,
                style: {
                    backgroundColor: '#ff4444',
                    color: '#fff',
                }
            });
            return;
        }

        const timeSend = moment().format('YYYY-MM-DD HH:mm:ss');

        const checkData = {
            suscces: 0,
            fail: 0
        }

        setShowModalSendMail(false);

        for (let i = 0; i < selectedRowKeys.length; i++) {
            const res_data: any = await axiosInstance.get(`/email/send-email-to-user?emailId=${selectedTemplate}&userId=${selectedRowKeys[i]}&dateTime=${timeSend}`)
            if (res_data.code == 200) {
                checkData.suscces += 1;
            } else {
                checkData.fail += 1;
            }
        }

        if (checkData.suscces > 0) {
            toast.success(`Gửi email thành công cho ${checkData.suscces} học viên, Thất bại ${checkData.fail}`, {
                duration: 4000,
                style: {
                    backgroundColor: '#00cc00',
                    color: '#fff',
                }
            });
        }

    }

    useEffect(() => {
        fetchCustomerData();
    }, [page, searchKeyword, pageSize, fetchCustomerData, typeUser]);

    useEffect(() => {
        axiosInstance.get(`/email/get-all-template-email?page=1&pageSize=100`)
            .then((res) => setListTemplate(res.data))
            .catch((err) => console.error(err));

        axiosInstance.get("/customer/get-count-customer-type")
            .then((res) => setCountUser(res.data))
            .catch((err) => console.error(err));


    }, [])

    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            render: (_: any, __: any, index: number) => (page - 1) * pageSize + index + 1,
        },
        {
            title: "Tên khách hàng",
            dataIndex: "name",
            render: (_: any, record: Customer) => `${record.firstName} ${record.lastName}`,
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
        },
        {
            title: "utmSource",
            dataIndex: "utmSource",
        },
        {
            title: "Số lượng BOT",
            dataIndex: "totalBot",
        },
        {
            title: "Số lượng Page",
            dataIndex: "totalPage",
        },
        {
            title: "Ngày tham gia",
            dataIndex: "createdAt",
            render: (createdAt: string) => convertUtcToLocalTime(createdAt),
        },
        {
            title: "Lần đăng nhập cuối",
            dataIndex: "lastLoginAt",
            render: (lastLoginAt: string) => {
                if (lastLoginAt) {
                    return convertUtcToLocalTime(lastLoginAt)
                } else {
                    return "";
                }
            },
        },
        {
            title: "Lần cuối vào trang nâng cấp",
            dataIndex: "lastVisitSubscriptionPageAt",
            render: (lastVisitSubscriptionPageAt: string) => {
                if (lastVisitSubscriptionPageAt) {
                    return convertUtcToLocalTime(lastVisitSubscriptionPageAt)
                } else {
                    return "";
                }
            },
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: Customer) => (
                <Space>
                    <Button type="primary" onClick={() => handleViewCustomer(record.id)}>
                        Xem
                    </Button>

                    <Button type="link" className="!bg-green-300" onClick={() => handleLoginBotChat(record.id)}>
                        <i className="fa-solid fa-robot"></i> Chat
                    </Button>

                    <Popconfirm
                        title="Bạn có chắc chắn muốn xoá?"
                        description="Hành động này không thể hoàn tác."
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                        onConfirm={() => {
                            handleDeleteCustomer(record.id);
                        }}
                        onCancel={() => console.log('Đã hủy thao tác.')}
                    >
                        <Button loading={isWaitingDelete} disabled={isWaitingDelete} type="default" className='bg-red-500 text-white'>Xoá</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="">

            <div className="flex gap-2 mb-3 bg-white p-3 rounded-lg overflow-auto text-nowrap">
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

            </div>


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

                <div className="flex space-x-3">
                    <button
                        onClick={() => setShowModalSendMail(true)}
                        className="px-2 py-0 bg-orange-500 text-white rounded">
                        <i className="fa-solid fa-square-envelope"></i>
                        <span>Gửi mail hàng loạt</span>
                    </button>
                    <button
                        className="px-2 py-0 bg-green-500 text-white rounded flex items-center gap-2"
                        onClick={() => setShowModalAddUser(true)}>
                        <i className="fa-solid fa-plus"></i>
                        <span className="hidden lg:block">Thêm học viên</span>
                    </button>
                </div>
            </div>

            <Table
                loading={loading}
                dataSource={customerData && customerData.map((customer) => ({
                    ...customer,
                    key: customer.id,
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

            <Modal
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
            </Modal>
        </div>
    );
}
