'use client'

import { useEffect, useState } from "react";
import axiosCustomerConfig from "@/libs/configs/ApiConfig/axiosCustomerConfig";
import Swal from "sweetalert2";
import { Button, Card, Form, Input, Skeleton, Typography } from "antd";

const { Title } = Typography;

export default function ChangePassword() {
  const [isClient, setIsClient] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!newPassword || !confirmPassword) {
      Swal.fire({
        icon: "error",
        text: "Vui lòng nhập đầy đủ thông tin!",
        position: "top-end",
        confirmButtonText: "OK",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        text: "Mật khẩu không khớp, vui lòng kiểm tra lại!",
        position: "top-end",
        confirmButtonText: "OK",
      });
      return;
    }

    axiosCustomerConfig
      .post("/Customer/set-password", { newPassword })
      .then((res: any) => {
        const code = res.code;
        if (code === 200) {
          Swal.fire({
            icon: "success",
            text: "Cập nhật mật khẩu thành công!",
            confirmButtonText: "OK",
          });
          setNewPassword("");
          setConfirmPassword("");
        } else {
          Swal.fire({
            icon: "error",
            text: "Cập nhật mật khẩu thất bại",
            position: "top-end",
            confirmButtonText: "OK",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          text: "Cập nhật mật khẩu thất bại",
          position: "top-end",
          confirmButtonText: "OK",
        });
      });
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-8">
        <Title level={2} className="text-center text-color-secondary">
          Bổ sung mật khẩu
        </Title>
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      <Title level={2} className="text-center text-color-secondary">
        Bổ sung mật khẩu
      </Title>

      <Card>
        <Form layout="vertical" onFinish={handleChangePassword}>
          <Form.Item
            label="Mật khẩu mới"
            required
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu mới"
            required
            rules={[{ required: true, message: "Vui lòng nhập lại mật khẩu" }]}
          >
            <Input.Password
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
              >
                Cập nhật mật khẩu
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
