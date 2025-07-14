"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import Image from "next/image"
import { Form, Input, Button, Tabs, Card, Divider, Typography } from "antd"
import {
  GoogleOutlined,
  MailOutlined,
  LockOutlined,
  UserOutlined,
  RocketOutlined,
  StarFilled,
  ThunderboltFilled,
} from "@ant-design/icons"
import axiosCustomerConfig from "@/libs/configs/ApiConfig/axiosCustomerConfig"
import Swal from "sweetalert2"

const { Title, Text, Paragraph } = Typography

interface LoginForm {
  email: string
  password: string
}

interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
}

export default function AuthTabs() {
  const [isClient, setIsClient] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()

  const [loginForm] = Form.useForm()
  const [registerForm] = Form.useForm()

  const handleLogin = async (values: LoginForm) => {
    setLoading(true)
    try {
      const response: any = await axiosCustomerConfig.post("/Auth/Login", values)
      if (response.code === 200) {
        sessionStorage.setItem("user", JSON.stringify(response.data))
        sessionStorage.setItem("AccessToken", response.data.accessToken)
        sessionStorage.setItem("RefreshToken", response.data.refreshToken)
        axiosCustomerConfig.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`
        await handleChangeStudyPage()
      } else {
        Swal.fire({
          icon: "error",
          title: "Đăng nhập thất bại",
          text: "Tài khoản hoặc mật khẩu không đúng",
        })
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Đăng nhập thất bại",
        text: "Tài khoản hoặc mật khẩu không đúng",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (values: RegisterForm) => {
    setLoading(true)
    try {
      const response: any = await axiosCustomerConfig.post("/Auth/Register", values)
      if (response.code === 201) {
        toast.success("Đăng ký thành công, vui lòng đăng nhập", {
          duration: 3000,
          position: "top-right",
        })
        registerForm.resetFields()
      } else {
        toast.error("Đăng ký thất bại", {
          duration: 3000,
          position: "top-right",
        })
      }
    } catch (error) {
      console.error("Error registering:", error)
      toast.error("Đăng ký thất bại", {
        duration: 3000,
        position: "top-right",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLoginGoogle = async () => {
    setGoogleLoading(true)
    try {
      const res = await axiosCustomerConfig.get("/Auth/google-login")
      window.location.href = res.data
    } catch (error) {
      toast.error("Có lỗi xảy ra với đăng nhập Google", {
        duration: 3000,
        position: "top-right",
      })
    } finally {
      setGoogleLoading(false)
    }
  }

  const handleChangeStudyPage = async () => {
    try {
      const response: any = await axiosCustomerConfig.get("/course/get-last-lesson")
      if (response.code === 200) {
        router.push(`/study/${response.data}`)
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại", {
          duration: 3000,
          position: "top-right",
        })
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại", {
        duration: 3000,
        position: "top-right",
      })
    }
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const user = sessionStorage.getItem("user")
    if (user) {
      setIsLogin(true)
    }
  }, [isClient])

  if (!isClient) {
    return null
  }

  if (isLogin) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 w-full h-full">
        <Card
          className="max-w-lg mx-auto bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 border-0 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 cursor-pointer transform hover:scale-105"
          onClick={handleChangeStudyPage}
        >
          <div className="text-center text-white p-8">
            <div className="relative mb-6">
              <RocketOutlined className="text-8xl mb-4 animate-bounce text-yellow-300 hover:text-yellow-200 transition-colors duration-300" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <Title level={1} className="text-white mb-6 font-bold text-3xl">
              Chào mừng đồng nghiệp quay trở lại! 🎉
            </Title>
            <Button
              type="primary"
              size="large"
              className="bg-white text-purple-600 border-0 hover:bg-gray-100 font-bold px-12 py-8 h-auto text-xl rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                <ThunderboltFilled className="text-2xl" />
                Tiếp tục học
              </span>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const tabItems = [
    {
      key: "login",
      label: (
        <span className="text-xl font-bold px-6 py-2 flex items-center gap-3 hover:text-purple-600 transition-colors duration-300 cursor-pointer">
          <UserOutlined className="text-2xl hover:scale-110 transition-transform duration-300" />
          Đăng nhập
        </span>
      ),
      children: (
        <div className="">
          <div className="text-center mb-8">
            <Title level={3} className="text-gray-800 mb-2">
              Chào mừng trở lại! 👋
            </Title>
            <Text className="text-gray-600 text-lg">Đăng nhập để tiếp tục hành trình học tập của bạn</Text>
          </div>
          <div className="mb-8 w-full border-0 backdrop-blur-sm  hover:shadow-blue-500/25 transition-all duration-500">
            <Button
              onClick={handleLoginGoogle}
              loading={googleLoading}
              className="!w-full h-16 border-2 border-gray-200 hover:border-blue-400 rounded-2xl flex items-center justify-center gap-4 bg-red-400 hover:bg-blue-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            >
              <GoogleOutlined className="text-2xl text-white group-hover:text-red-500  group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              <span className="text-xl font-bold text-white group-hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                🚀 Tiếp tục với Google
              </span>
            </Button>
          </div>
          <Form form={loginForm} onFinish={handleLogin} layout="vertical" size="large" className="space-y-6">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                prefix={
                  <MailOutlined className="text-purple-500 text-xl hover:scale-110 transition-transform duration-300" />
                }
                placeholder="Email của bạn"
                className="h-14 rounded-2xl border-2 border-purple-200 hover:border-purple-400 focus:border-purple-600 bg-purple-50/50 text-lg font-medium shadow-sm hover:shadow-md transition-all duration-300"
              />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
              <Input.Password
                prefix={
                  <LockOutlined className="text-purple-500 text-xl hover:scale-110 transition-transform duration-300" />
                }
                placeholder="Mật khẩu"
                className="h-14 rounded-2xl border-2 border-purple-200 hover:border-purple-400 focus:border-purple-600 bg-purple-50/50 text-lg font-medium shadow-sm hover:shadow-md transition-all duration-300"
              />
            </Form.Item>

            <div className="text-center mb-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
              <Text className="text-gray-700 text-lg">
                🎯 Đăng nhập để tiếp tục học{" "}
                <p className="text-purple-600 font-bold bg-yellow-200 px-2 py-1 rounded-lg">
                  Hoàn toàn miễn phí!
                </p>
              </Text>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-16 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 border-0 rounded-2xl text-xl font-bold hover:from-purple-700 hover:via-pink-700 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-3">
                  <RocketOutlined className="text-yellow-300 text-2xl animate-pulse hover:animate-spin transition-all duration-300" />
                  <div>
                    <div className="text-xl">🚀 ĐĂNG NHẬP NGAY</div>
                    <div className="text-sm opacity-90">Hoàn toàn MIỄN PHÍ | Hiệu quả cao</div>
                  </div>
                </div>
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      key: "register",
      label: (
        <span className="text-xl font-bold px-6 py-2 flex items-center gap-3 hover:text-pink-600 transition-colors duration-300 cursor-pointer">
          <StarFilled className="text-2xl hover:scale-110 hover:rotate-12 transition-all duration-300" />
          Đăng ký
        </span>
      ),
      children: (
        <div className="p-8">
          <div className="text-center mb-8">
            <Title level={3} className="text-gray-800 mb-2">
              Tham gia cùng chúng tôi! ✨
            </Title>
            <Text className="text-gray-600 text-lg">Tạo tài khoản để bắt đầu hành trình học tập</Text>
          </div>

          <Form form={registerForm} onFinish={handleRegister} layout="vertical" size="large" className="space-y-6">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                prefix={
                  <MailOutlined className="text-pink-500 text-xl hover:scale-110 transition-transform duration-300" />
                }
                placeholder="Email của bạn"
                className="h-14 rounded-2xl border-2 border-pink-200 hover:border-pink-400 focus:border-pink-600 bg-pink-50/50 text-lg font-medium shadow-sm hover:shadow-md transition-all duration-300"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password
                prefix={
                  <LockOutlined className="text-pink-500 text-xl hover:scale-110 transition-transform duration-300" />
                }
                placeholder="Mật khẩu"
                className="h-14 rounded-2xl border-2 border-pink-200 hover:border-pink-400 focus:border-pink-600 bg-pink-50/50 text-lg font-medium shadow-sm hover:shadow-md transition-all duration-300"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"))
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={
                  <LockOutlined className="text-pink-500 text-xl hover:scale-110 transition-transform duration-300" />
                }
                placeholder="Xác nhận mật khẩu"
                className="h-14 rounded-2xl border-2 border-pink-200 hover:border-pink-400 focus:border-pink-600 bg-pink-50/50 text-lg font-medium shadow-sm hover:shadow-md transition-all duration-300"
              />
            </Form.Item>

            <div className="text-center mb-6 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl">
              <Text className="text-gray-700 text-lg">
                🎉 Không có thêm bước nào cả{" "}
                <p className="text-pink-600 font-bold bg-yellow-200 px-2 py-1 rounded-lg">
                  Đăng ký là xem được ngay!
                </p>
              </Text>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-16 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 border-0 rounded-2xl text-xl font-bold hover:from-pink-700 hover:via-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-3">
                  <StarFilled className="text-yellow-300 text-2xl animate-pulse hover:animate-bounce transition-all duration-300" />
                  <div>
                    <div className="text-xl">✨ ĐĂNG KÝ NGAY</div>
                    <div className="text-sm opacity-90">Hoàn toàn MIỄN PHÍ | Hiệu quả cao</div>
                  </div>
                </div>
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ]

  return (

    <div className="w-full h-full max-w-2xl mx-auto flex items-center justify-center">
      {/* Auth Tabs */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-purple-500/25 transition-all duration-500">
        <Tabs defaultActiveKey="login" items={tabItems} centered className="beautiful-auth-tabs" size="large" />
        <Divider className="border-gray-300 my-8" />
        <div className="text-center p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 rounded-2xl">
          <Title level={4} className="text-gray-800 mb-4">
            📚 Khóa học hướng dẫn sử dụng bot chốt đơn
          </Title>
          <Paragraph className="text-gray-700 mb-0 text-lg">
            Khóa học thực tiễn nhất, mọi kiến thức đều được áp dụng trên chính khóa học - và bạn sẽ được nhìn thấy
            DATA đầy đủ!{" "}
            <span className="font-bold text-purple-600 bg-yellow-200 px-2 py-1 rounded-lg">100% miễn phí!</span>
          </Paragraph>
        </div>
      </Card>
    </div>

  )
}
