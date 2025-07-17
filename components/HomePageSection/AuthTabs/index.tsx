"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { Form, Input, Button, Tabs, Card, Divider, Typography, Spin } from "antd"
import {
  GoogleOutlined,
  MailOutlined,
  LockOutlined,
  RocketOutlined,
  ThunderboltFilled,
} from "@ant-design/icons"
import axiosCustomerConfig from "@/libs/configs/ApiConfig/axiosCustomerConfig"
import axiosCustomerNestJsConfig from "@/libs/configs/ApiConfig/axiosBackEndNesjs"
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
  const [userInfo, setUserInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()

  const [loginForm] = Form.useForm()
  const [registerForm] = Form.useForm()

  const handleGetInfoUser = async () => {
    try {
      const response: any = await axiosCustomerConfig.get("/customer/get-info")
      if (response.code === 200) {
        setUserInfo(response.data)
      } else {
        console.error("Failed to fetch user info:", response.message)
      }
    } catch (error) {
      console.error("Error fetching user info:", error)

    }
  }

  const handleLogin = async (values: LoginForm) => {
    setLoading(true)
    try {
      const response: any = await axiosCustomerConfig.post("/Auth/Login", values)
      if (response.code == 200) {
        localStorage.clear()
        localStorage.setItem("AccessToken", response.data.accessToken)
        localStorage.setItem("RefreshToken", response.data.refreshToken)
        axiosCustomerConfig.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`
        Swal.fire({
          icon: "success",
          title: "Đăng nhập thành công",
          text: "Chào mừng bạn trở lại!",
        })
        await handleGetInfoUser()
      } else {
        Swal.fire({
          icon: "error",
          title: "Đăng nhập thất bại",
          text: response.response.data.message || "Tài khoản hoặc mật khẩu không đúng",
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
    // try {
    //   const response: any = await axiosCustomerConfig.post("/Auth/Register", values)
    //   if (response.code === 201) {
    //     toast.success("Đăng ký thành công, vui lòng đăng nhập", {
    //       duration: 3000,
    //       position: "top-right",
    //     })
    //     registerForm.resetFields()
    //   } else {
    //     toast.error("Đăng ký thất bại", {
    //       duration: 3000,
    //       position: "top-right",
    //     })
    //   }
    // } catch (error) {
    //   console.error("Error registering:", error)
    //   toast.error("Đăng ký thất bại", {
    //     duration: 3000,
    //     position: "top-right",
    //   })
    // } finally {
    //   setLoading(false)
    // }
    try {
      const response: any = await axiosCustomerNestJsConfig.post("/auth/register", {
        email: values.email,
        password: values.password,
      })

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Đăng ký thành công",
          text: "Vui lòng đăng nhập để tiếp tục",
        })
        registerForm.resetFields()
      } else {
        Swal.fire({
          icon: "error",
          title: "Đăng ký thất bại",
          text: response.data.message || "Vui lòng kiểm tra lại thông tin đăng ký",
        })
      }

    } catch (error) {
      console.error("Error registering:", error)
      Swal.fire({
        icon: "error",
        title: "Đăng ký thất bại",
        text: "Vui lòng kiểm tra lại thông tin đăng ký",
      })
    }
    finally {
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

  useEffect(() => {
    if (!isClient) {
      return
    }
    const accessToken = localStorage.getItem("AccessToken")
    if (!accessToken) {
      return
    }
    handleGetInfoUser()

  }, [isClient])

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" className="text-purple-600" />
        <div className="mt-4 text-white">Đang tải...</div>
      </div>
    )
  }

  if (userInfo) {
    return (
      <Card className="w-full max-w-md mx-auto border-0 bg-transparent">
        <Title level={3} className="text-center mb-4">
          <ThunderboltFilled className="text-yellow-500" /> Chào mừng {(userInfo.firstName || "") + " " + (userInfo.lastName || "") || userInfo.email}!
        </Title>
        <Button type="primary" className="w-full mt-4 bg-[#4ADE80]" onClick={() => router.push("/study")}>
          Tiếp tục học ngay
        </Button>
      </Card>
    )
  }

  const tabItems = [
    {
      key: "login",
      label: (
        <span className="text-xl font-bold px-3 py-2 flex items-center gap-3 text-white hover:text-purple-600 transition-colors duration-300 cursor-pointer">
          Đăng nhập
        </span>
      ),
      children: (
        <div className="">
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
                className="h-14 rounded-2xl border-2 border-purple-200 hover:border-purple-400 focus:border-purple-600 text-lg font-medium shadow-sm hover:shadow-md transition-all duration-300"
              />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
              <Input.Password
                prefix={
                  <LockOutlined className="text-purple-500 text-xl hover:scale-110 transition-transform duration-300" />
                }
                placeholder="Mật khẩu"
                className="h-14 rounded-2xl border-2 border-purple-200 hover:border-purple-400 focus:border-purple-600 text-lg font-medium shadow-sm hover:shadow-md transition-all duration-300"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-14 bg-[linear-gradient(90deg,#22c55e_0%,#059669_100%)]"
              >
                <div className="flex items-center justify-center gap-3">
                  <RocketOutlined className="text-yellow-300 text-2xl animate-pulse hover:animate-spin transition-all duration-300" />
                  <div>
                    <div className="text-xl">Đăng Nhập</div>
                  </div>
                </div>
              </Button>
            </Form.Item>

            <div className="">
              <Button
                onClick={handleLoginGoogle}
                loading={googleLoading}
                className="!w-full h-16 border-2 border-gray-200 hover:border-blue-400 rounded-2xl flex items-center justify-center gap-4 bg-red-400 hover:bg-blue-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                <GoogleOutlined className="text-2xl text-white group-hover:text-red-500  group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <span className="text-xl font-bold text-white group-hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                  Đăng nhập với Google
                </span>
              </Button>
            </div>
          </Form>
        </div>
      ),
    },
    {
      key: "register",
      label: (
        <span className="text-xl font-bold px-3 py-2 flex items-center gap-3 text-white hover:text-pink-600 transition-colors duration-300 cursor-pointer">
          Đăng ký
        </span>
      ),
      children: (
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
              className="h-14 rounded-2xl border-2 border-pink-200 hover:border-pink-400 focus:border-pink-600 text-lg font-medium shadow-sm hover:shadow-md transition-all duration-300"
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
              className="h-14 rounded-2xl border-2 border-pink-200 hover:border-pink-400 focus:border-pink-600 text-lg font-medium shadow-sm hover:shadow-md transition-all duration-300"
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
              className="h-14 rounded-2xl border-2 border-pink-200 hover:border-pink-400 focus:border-pink-600 text-lg font-medium shadow-sm hover:shadow-md transition-all duration-300"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-16 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 border-0 rounded-2xl text-xl font-bold hover:from-pink-700 hover:via-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="text-xl">Đăng ký ngay</div>
              </div>
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ]

  return (
    <Tabs defaultActiveKey="login" items={tabItems} centered className="beautiful-auth-tabs" size="large" />

  )
}
