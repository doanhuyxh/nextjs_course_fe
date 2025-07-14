'use client'

import React, { useEffect } from "react";
import { Collapse, Input, Form, Button, Row, Col, Select } from "antd";
import axiosInstance from "@/libs/configs/ApiConfig/axiosAdminConfig";
import { ResponseData } from "@/libs/types";
import toast from "react-hot-toast";

export default function MailConfig() {

    const { Option } = Select;
    const [formSmtp] = Form.useForm();
    const [formMarketing] = Form.useForm();
    const [formSendGrid] = Form.useForm();
    const [emailTest, setEmailTest] = React.useState<string>("");

    const handleTestEmail = async (type: string) => {
        try {
            const res: ResponseData = await axiosInstance.get(`/email/test-send-email?email=${emailTest}&type=${type}`);
            if (res.code == 200) {
                toast.success("Gửi email test thành công");
            } else {
                toast.error("Gửi email test thất bại");
            }
        } catch (error) {
            toast.error("Gửi email test thất bại");
        }
    }

    const SaveSmtpConfig = async () => {
        try {
            const values = await formSmtp.validateFields();
            const res: ResponseData = await axiosInstance.post("/email/update-smtp-config", values);

            if (res.code == 200) {
                toast.success("Lưu cấu hình SMTP thành công");
            } else {
                toast.error("Lưu cấu hình SMTP thất bại");
            }

        } catch (error) {
            toast.error("Lưu cấu hình SMTP thất bại");
        }
        setEmailTest("")
    };

    const SaveEmailMarketing = async () => {
        try {
            const values = await formMarketing.validateFields();
            const res: ResponseData = await axiosInstance.post("/email/update-email-marketing", values);

            if (res.code == 200) {
                toast.success("Lưu cấu hình Email marketing thành công");
            } else {
                toast.error("Lưu cấu hình Email marketing thất bại");
            }
        } catch (error) {
            toast.error("Lưu cấu hình Email marketing thất bại");
        }
    };

    const SaveSendGridConfig = async () => {
        try {
            const values = await formSendGrid.validateFields();
            const res: ResponseData = await axiosInstance.post("/email/update-sendgrid-config", values);

            if (res.code == 200) {
                toast.success("Lưu cấu hình SendGrid thành công");
            } else {
                toast.error("Lưu cấu hình SendGrid thất bại");
            }
        } catch (error) {       
            toast.error("Lưu cấu hình SendGrid thất bại");
        }
        setEmailTest("")
    }

    const GetSmtpConfig = React.useCallback(async () => {
        const res: ResponseData = await axiosInstance.get("/email/get-smtp-config");
        if (res.code == 200) {
            formSmtp.setFieldsValue(res.data);
        }
    }, [formSmtp]);

    const GetEmailMarketingConfig = React.useCallback(async () => {
        const res: ResponseData = await axiosInstance.get("/email/get-email-marketing");
        if (res.code == 200) {
            formMarketing.setFieldsValue(res.data);
        }
    }, [formMarketing]);

    const GetSendGridConfig = React.useCallback(async () => {
        const res: ResponseData = await axiosInstance.get("/email/get-sendgrid-config");
        if (res.code == 200) {
            formSendGrid.setFieldsValue(res.data);
        }
    }, [formSendGrid]);

    const items = [
        {
            key: "1",
            label: <span className="font-bold text-white">Cấu hình SMTP</span>,
            children: (
                <Form layout="vertical" form={formSmtp} className="space-y-4">
                    <Row className="mb-4">
                        <Col span={24} className="text-right">
                            <Button type="primary" onClick={SaveSmtpConfig} className="rounded-md">
                                Lưu cấu hình
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} className="mb-4">
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">Host</label>} name="host">
                                <Input placeholder="Nhập host" className="rounded-md" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">PORT</label>} name="port">
                                <Input placeholder="Nhập port" type="number" className="rounded-md" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} className="mb-4">
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">Protocol</label>} name="protocol">
                                <Select placeholder="Chọn protocol" className="rounded-md">
                                    <Option value="none">None</Option>
                                    <Option value="SSL">SSL</Option>
                                    <Option value="TSL">TSL</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">Authentication</label>} name="authentication">
                                <Select placeholder="Chọn phương thức" className="rounded-md">
                                    <Option value="none">None</Option>
                                    <Option value="PLAIN">PLAIN</Option>
                                    <Option value="LOGIN">LOGIN</Option>
                                    <Option value="CRAM-MD5">CRAM-MD5</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} className="mb-4">
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">Username</label>} name="username">
                                <Input placeholder="Nhập username" className="rounded-md" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">Password</label>} name="password">
                                <Input.Password placeholder="Nhập password" className="rounded-md" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} className="mb-4">
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">Tên người gửi</label>} name="sender">
                                <Input placeholder="Nhập tên người gửi" className="rounded-md" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">Email</label>} name="email">
                                <Input placeholder="Nhập email" className="rounded-md" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col span={24}>
                            <Form.Item label={<label className="font-bold">Unsubscribe Link</label>} name="unsubscribeText">
                                <Input.TextArea placeholder="Unsubscribe Link" className="rounded-md" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="space-y-1">
                                <span className="font-bold text-gray-700">Gửi test email</span>
                                <div className="flex items-center gap-3">
                                    <Input
                                        placeholder="Nhập email"
                                        className="rounded-md"
                                        value={emailTest}
                                        onChange={(e) => setEmailTest(e.target.value)}
                                    />
                                    <Button type="primary" className="rounded-md" onClick={() => handleTestEmail("smtp")}>
                                        Gửi
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Form>
            ),
        },
        {
            key: "2",
            label: <span className="font-bold text-white">Cấu hình Email Marketing</span>,
            children: (
                <Form layout="vertical" form={formMarketing} className="space-y-4">
                    <Row className="mb-4">
                        <Col span={24} className="text-right">
                            <Button type="primary" onClick={SaveEmailMarketing} className="rounded-md">
                                Lưu cấu hình
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} className="mb-4">
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">Host</label>} name="host">
                                <Input placeholder="Nhập host" className="rounded-md" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">PORT</label>} name="port">
                                <Input placeholder="Nhập port" type="number" className="rounded-md" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} className="mb-4">
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">Protocol</label>} name="protocol">
                                <Select placeholder="Chọn protocol" className="rounded-md">
                                    <Option value="none">None</Option>
                                    <Option value="SSL">SSL</Option>
                                    <Option value="TSL">TSL</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">Authentication</label>} name="authentication">
                                <Select placeholder="Chọn phương thức" className="rounded-md">
                                    <Option value="none">None</Option>
                                    <Option value="PLAIN">PLAIN</Option>
                                    <Option value="LOGIN">LOGIN</Option>
                                    <Option value="CRAM-MD5">CRAM-MD5</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} className="mb-4">
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">Username</label>} name="username">
                                <Input placeholder="Nhập username" className="rounded-md" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">Password</label>} name="password">
                                <Input.Password placeholder="Nhập password" className="rounded-md" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} className="mb-4">
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">Tên người gửi</label>} name="sender">
                                <Input placeholder="Nhập tên người gửi" className="rounded-md" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">Email</label>} name="email">
                                <Input placeholder="Nhập email" className="rounded-md" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col span={24}>
                            <Form.Item label={<label className="font-bold">Unsubscribe Link</label>} name="unsubscribeLink">
                                <Input.TextArea placeholder="Unsubscribe Link" className="rounded-md" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="space-y-1">
                                <span className="font-bold text-gray-700">Gửi test email</span>
                                <div className="flex items-center gap-3">
                                    <Input
                                        placeholder="Nhập email"
                                        className="rounded-md"
                                        value={emailTest}
                                        onChange={(e) => setEmailTest(e.target.value)}
                                    />
                                    <Button type="primary" className="rounded-md" onClick={() => handleTestEmail("marketing")}>
                                        Gửi
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Form>
            ),
        },
        {
            key: "3",
            label: <span className="font-bold text-white">Cấu hình SendGrid</span>,
            children: (
                <Form layout="vertical" form={formSendGrid} className="space-y-4">
                    <Row className="mb-4">
                        <Col span={24} className="text-right">
                            <Button type="primary" onClick={SaveSendGridConfig} className="rounded-md">
                                Lưu cấu hình
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} className="mb-4">
                        <Col span={24}>
                            <Form.Item label={<label className="font-bold">API Key</label>} name="apiKey">
                                <Input placeholder="Nhập API Key" className="rounded-md" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">Email gửi</label>} name="senderEmail">
                                <Input placeholder="Nhập email người gửi" className="rounded-md" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<label className="font-bold">Tên người gửi mail</label>} name="senderName">
                                <Input placeholder="Nhập tên người gửi" className="rounded-md" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="space-y-1">
                                <span className="font-bold text-gray-700">Gửi test email</span>
                                <div className="flex items-center gap-3">
                                    <Input
                                        placeholder="Nhập email"
                                        className="rounded-md"
                                        value={emailTest}
                                        onChange={(e) => setEmailTest(e.target.value)}
                                    />
                                    <Button type="primary" className="rounded-md" onClick={() => handleTestEmail("sendgrid")}>
                                        Gửi
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Form>
            ),
        },
    ];

    useEffect(() => {
        GetSmtpConfig();
        GetEmailMarketingConfig();
        GetSendGridConfig();
    }, [GetSmtpConfig, GetEmailMarketingConfig, GetSendGridConfig]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Cấu hình Email</h1>
            <p className="text-gray-600 mb-6">
                Cấu hình các dịch vụ gửi email: SMTP, Email Marketing và SendGrid.
            </p>
            <Collapse defaultActiveKey={["1"]} items={items} className="collapse_antd" />
        </div>
    );
}
