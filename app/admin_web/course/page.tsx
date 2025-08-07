'use client'
import { useEffect, useState, useCallback } from 'react';
import { Button, Input, Table, Dropdown, Space, message, Spin, Badge, Popconfirm } from 'antd';
import type { MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/libs/configs/ApiConfig/axiosAdminConfig';
import { MemberType, ResponseData } from "@/libs/types";

export default function Course() {
    const router = useRouter();
    const pageSize = 10;

    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [status, setStatus] = useState('published');
    const [checkbox, setCheckbox] = useState<string[]>([]);
    const [totalResult, setTotalResult] = useState(0);
    const [courses, setCourses] = useState([]);
    const [countCourses, setCountCourses] = useState(null as any);
    const [totalPage, setTotalPage] = useState(0);

    const fetchData = useCallback(async () => {
        try {
            const res: ResponseData = await axiosInstance.get(`/course/GetAllCourse?page=${page}&pageSize=${pageSize}&status=${status}&search_keyword=${searchKeyword}`);
            if (res.code === 200) {
                const data = res.data;
                setCourses(data.data);
                setTotalResult(data.totalResult);
                setTotalPage(data.totalPage);
            }
        } catch (error) {
            message.error('Failed to fetch courses.');
        } finally {
            setIsLoading(false);
        }
    }, [page, status, searchKeyword]);

    const fetchCountCourses = useCallback(async () => {
        try {
            const res: ResponseData = await axiosInstance.get(`/course/GetCountCourse`);
            if (res.code === 200) {
                setCountCourses(res.data);
            }
        } catch (error) {
            message.error('Failed to fetch course counts.');
        }
    }, [])

    useEffect(() => {
        fetchData();
        fetchCountCourses();
    }, [fetchData, fetchCountCourses]);

    const handleAddOrUpdateCourse = (id: string) => router.push(`/admin_web/course/form?id=${id}`);
    const handleDetailCourse = (id: string) => router.push(`/admin_web/course/lesson?id=${id}`);

    const handleDeleteCourse = async (id: string) => {
        try {
            await axiosInstance.get(`/course/delete?id=${id}`);
            message.success('Deleted course successfully.');
            fetchData();
        } catch {
            message.error('Failed to delete course.');
        }
    };

    const handleUpdateStatus = async (action: string) => {
        try {
            for (const id of checkbox) {
                if (action === 'delete') {
                    await axiosInstance.get(`/course/delete?id=${id}`);
                } else {
                    await axiosInstance.get(`/course/updateStatus?id=${id}&status=${action}`);
                }
            }
            message.success('Bulk action completed successfully.');
            await fetchData();
        } catch {
            message.error('Failed to perform bulk action.');
        }
    };

    const menuItems: MenuProps['items'] = [
        {
            key: '1',
            label: 'Chuyển sang công khai',
            className: 'text-green-500',
            onClick: () => handleUpdateStatus('published'),
        },
        {
            key: '2',
            label: 'Chuyển sang ẩn',
            onClick: () => handleUpdateStatus('hidden'),
        },
        {
            key: '3',
            label: 'Chuyển sang tạm dừng',
            onClick: () => handleUpdateStatus('stop'),
        },
        {
            key: '4',
            label: 'Chuyển sang nháp',
            onClick: () => handleUpdateStatus('draft'),
        },
        {
            key: '5',
            label: status === 'delete' ? 'Xoá' : 'Chuyển sang thùng rác',
            onClick: () => handleUpdateStatus('delete'),
        },
    ];


    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: 'Tên khoá học',
            dataIndex: 'name',
        },
        {
            title: 'Ảnh thumbnail',
            dataIndex: 'image',
            render: (image: string) => image && <img src={image} alt="thumbnail" style={{ width: 100, height: 100 }} />,
        },
        {
            title: 'Số bài học',
            dataIndex: 'numberOfLessons',
        },
        {
            title: 'Tổng thời lượng',
            dataIndex: 'totalTimeDuration',
        },
        {
            title: 'Phân loại khách hàng',
            dataIndex: 'memberType',
            render: (memberType: string) => {
                return MemberType.find(item => item.value === memberType)?.label || 'Không xác định';
            },
        },
        {
            title: 'Hành động',
            render: (record: any) => (
                <Space>
                    <Button type="link" onClick={() => handleAddOrUpdateCourse(record.id)}>
                        <i className="fas fa-edit" />
                    </Button>
                    <Button type="link" onClick={() => handleDetailCourse(record.id)}>
                        <i className="fas fa-eye" />
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xoá?"
                        description="Hành động này không thể hoàn tác."
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                        onConfirm={() => handleDeleteCourse(record.id)}
                        onCancel={() => console.log('Đã hủy thao tác.')}
                    >
                        <Button type="link" danger>
                            <i className="fas fa-trash" />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        console.log('Count Courses:', countCourses);
    },[countCourses])

    return (
        <div>
            <div className='flex items-center justify-between gap-4 mb-4 flex-col lg:flex-row'>
                <h1 className="font-bold text-nowrap">Danh sách khoá học</h1>

                <div className="flex gap-2 overflow-auto w-full lg:w-fit">
                    <button
                        className={`${status == 'published' ? 'bg-green-500' : 'bg-gray-500'} text-white px-3 py-0 rounded-md text-nowrap`}
                        onClick={() => setStatus('published')}>Công khai ({countCourses?.published || 0})
                    </button>
                    <button
                        className={`${status == 'hidden' ? 'bg-blue-500' : 'bg-gray-500'} text-white px-3 py-0 rounded-md text-nowrap`}
                        onClick={() => setStatus('hidden')}>Ẩn ({countCourses?.hidden || 0})
                    </button>
                    <button
                        className={`${status == 'stop' ? 'bg-orange-500' : 'bg-gray-500'} text-white px-3 py-0 rounded-md text-nowrap`}
                        onClick={() => setStatus('stop')}>Tạm dừng ({countCourses?.stop || 0})
                    </button>
                    <button
                        className={`${status == 'draft' ? 'bg-yellow-500' : 'bg-gray-500'} text-white px-3 py-0 rounded-md text-nowrap`}
                        onClick={() => setStatus('draft')}>Nháp/Chờ duyệt ({countCourses?.draft || 0})
                    </button>
                    <button
                        className={`${status == 'delete' ? 'bg-red-500' : 'bg-gray-500'} text-white px-3 py-0 rounded-md text-nowrap`}
                        onClick={() => setStatus('delete')}>Thùng rác ({countCourses?.delete || 0})
                    </button>
                    <Space>
                        <Input
                            placeholder="Tìm kiếm"
                            className="rounded"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            style={{ width: 280 }}
                        />

                        <Dropdown menu={{ items: menuItems }} placement="bottomLeft" arrow>
                            <Button style={{ height: 40 }}>Thao tác</Button>
                        </Dropdown>

                        <Button type="primary" style={{ height: 40 }} onClick={() => handleAddOrUpdateCourse('')}>+ Thêm
                            mới</Button>

                    </Space>
                </div>

            </div>
            <Spin spinning={isLoading}>
                <Table
                    rowKey="id"
                    dataSource={courses}
                    columns={columns}
                    pagination={{
                        current: page,
                        pageSize,
                        total: totalResult,
                        onChange: (page) => setPage(page),
                    }}
                    rowSelection={{
                        selectedRowKeys: checkbox,
                        onChange: (selectedRowKeys) => setCheckbox(selectedRowKeys as string[]),
                    }}
                    scroll={{ x: "max-content" }}
                />
            </Spin>
        </div>
    );
}
