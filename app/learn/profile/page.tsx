'use client';
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Select, Button, Form, Typography } from 'antd';
import ImageUploadUser from "@/components/FileHandle/Image";
import toast from 'react-hot-toast';
import axiosCustomerConfig from '@/libs/configs/ApiConfig/axiosCustomerConfig';
import Swal from 'sweetalert2';
import { get } from 'lodash';

const { Title } = Typography;
const { Option } = Select;

function ProfilePage() {
  const [form] = Form.useForm();
  const [isClient, setIsClient] = useState(false);
  const [info, setInfo] = useState({
    Id: '',
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    Gender: '',
    YearOfBirth: 0,
    City: '',
    FieldOfExpertise: '',
    YearOfExperience: 0,
    Description: "",
    BankAccountNumber: "",
    AccountBankName: "",
    AccountBankOwner: "",
    Email: "",
    Avatar: "",
  });

  const getUserInfo = React.useCallback(async () => {
    try {
      const res_data = sessionStorage.getItem("user");
      if (!res_data) throw new Error("Data is undefined");
      const data = JSON.parse(res_data);
      if (!data) throw new Error("Data is undefined");
      setInfo({
        Id: data.id || "",
        FirstName: data.firstName || "",
        LastName: data.lastName || "",
        PhoneNumber: data.phoneNumber || "",
        Gender: data.gender || "",
        YearOfBirth: data.yearOfBirth || 0,
        City: data.city || "",
        FieldOfExpertise: data.fieldOfExpertise || "",
        YearOfExperience: data.yearOfExperience || 0,
        Description: data.description || "",
        BankAccountNumber: data.bankAccountNumber || "",
        AccountBankName: data.accountBankName || "",
        AccountBankOwner: data.accountBankOwner || "",
        Email: data.email || "",
        Avatar: data.avatar || "",
      });

    } catch (error) {
      console.log(error);
      toast.error("Không thể tải thông tin");
    }
  }, []);

  const setAvatar = (avatar: string) => {
    setInfo({ ...info, Avatar: avatar });
  };

  const handleUpdateInfo = async (values: any) => {
    const payload = { ...info, ...values, Avatar: info.Avatar };
    const response: any = await axiosCustomerConfig.post("/customer/update-info", payload);
    if (response.code === 200) {
      toast.success("Cập nhật thông tin thành công");
    } else {
      toast.error("Cập nhật thông tin thất bại");
    }
  };

  useEffect(() => {
    form.setFieldsValue(info)
  }, [info, form]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    getUserInfo();

  }, [getUserInfo]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="max-w-7xl mx-auto mt-6">
      <div className="w-full flex flex-col justify-center items-center mb-10">
        <Title level={2} className="!text-center text-color-secondary">Thông tin cá nhân</Title>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-10 shadow-[0_0_10px_rgba(0,0,0,0.2)] bg-white p-6 rounded-xl">
        <ImageUploadUser initialLink={info.Avatar} onChange={setAvatar} />

        <div className="flex-1">
          <Form layout="vertical" form={form} onFinish={handleUpdateInfo}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="Họ" name="FirstName">
                  <Input className='rounded-md border border-gray-300' />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Tên" name="LastName">
                  <Input className='rounded-md border border-gray-300' />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Form.Item label="Giới tính" name="Gender">
                  <Select placeholder="Chọn giới tính">
                    <Option value="Male">Nam</Option>
                    <Option value="Female">Nữ</Option>
                    <Option value="Other">Khác</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="Năm sinh" name="YearOfBirth">
                  <Input type="number" className='rounded-md border border-gray-300' />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="Thành phố" name="City">
                  <Select placeholder="Chọn thành phố" className='rounded-md border border-gray-300'>
                    <Option value="Hà nội">Hà nội</Option>
                    <Option value="HCM">HCM</Option>
                    <Option value="Đà nẵng">Đà nẵng</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="Email" name="Email">
                  <Input disabled className='rounded-md border border-gray-300' />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Số điện thoại" name="PhoneNumber">
                  <Input className='rounded-md border border-gray-300' />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="Lĩnh vực chuyên môn" name="FieldOfExpertise">
                  <Input className='rounded-md border border-gray-300' />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Số năm kinh nghiệm" name="YearOfExperience">
                  <Input type="number" className='rounded-md border border-gray-300' />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Giới thiệu / mô tả" name="Description">
              <Input.TextArea rows={5} className='rounded-md border border-gray-300' />
            </Form.Item>

            <Title level={4}>Thông tin ngân hàng</Title>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Form.Item label="Tên ngân hàng" name="AccountBankName">
                  <Input className='rounded-md border border-gray-300' />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="Số tài khoản" name="BankAccountNumber">
                  <Input className='rounded-md border border-gray-300' />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="Chủ tài khoản" name="AccountBankOwner">
                  <Input className='rounded-md border border-gray-300' />
                </Form.Item>
              </Col>
            </Row>

            <div className="flex justify-end mt-4">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="text-white"
              >
                Cập nhật
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
