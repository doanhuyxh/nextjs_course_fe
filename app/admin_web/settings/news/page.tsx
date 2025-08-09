'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/libs/configs/ApiConfig/axiosAdminConfig';
import { Page } from '@/libs/types';
import EditorReactQuill from '@/components/Editor/ReactQuill';
import { convertUtcToLocalTime, generateSlug } from '@/libs/utils/index';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';

export default function News() {
    const [news, setNews] = useState<Page[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<Page>({
        id: '',
        title: '',
        slug: '',
        content: '',
        type: 'news',
        createdAt: ''
    });

    const [form] = Form.useForm();

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/settings/get-page-by-type?type=news');
            setNews(response.data);
        } catch (error) {
            console.error(error);
            message.error('Có lỗi khi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.get(`/settings/delete-page?id=${id}`);
            message.success('Xóa thành công');
            fetchNews();
        } catch (error) {
            console.error(error);
            message.error('Có lỗi xảy ra');
        }
    };

    const handleEdit = (record: Page) => {
        setPage(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        const emptyPage: Page = {
            id: '',
            title: '',
            slug: '',
            content: '',
            type: 'news',
            createdAt: ''
        };
        setPage(emptyPage);
        form.setFieldsValue(emptyPage);
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();

            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('slug', values.slug);
            formData.append('content', values.content);
            formData.append('id', page.id);

            await axiosInstance.post('/settings/create-or-update-page?type=news', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            message.success('Lưu thành công');
            fetchNews();
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
            message.error('Có lỗi xảy ra');
        }
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            render: (_: any, __: Page, index: number) => index + 1,
            width: 60
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title'
        },
        {
            title: 'Slug',
            dataIndex: 'slug'
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (date: string) => convertUtcToLocalTime(date)
        },
        {
            title: 'Thao tác',
            render: (_: any, record: Page) => (
                <Space>
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Sửa
                    </Button>
                    <Button danger onClick={() => handleDelete(record.id)}>
                        Xóa
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <h1 style={{ fontSize: 20, fontWeight: 600 }}>Quản lý tin tức</h1>
                <Button type="primary" onClick={handleAdd}>
                    Thêm mới
                </Button>
            </div>

            <Table
                dataSource={news}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={false}
            />

            <Modal
                title={page.id ? 'Cập nhật tin tức' : 'Thêm tin tức mới'}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSave}
                width="70%"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                    >
                        <Input
                            onChange={(e) => {
                                form.setFieldsValue({
                                    slug: generateSlug(e.target.value)
                                });
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Slug"
                        name="slug"
                        rules={[{ required: true, message: 'Vui lòng nhập slug' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Nội dung"
                        name="content"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
                    >
                        <EditorReactQuill
                            value={form.getFieldValue('content')}
                            onChange={(value) => form.setFieldsValue({ content: value })}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
