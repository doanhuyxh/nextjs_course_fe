"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import axiosCustomerConfig from "@/libs/configs/ApiConfig/axiosCustomerConfig"
import Swal from "sweetalert2";

interface LoginForm {
    email: string
    password: string
}


export default function Login() {
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [googleLoading, setGoogleLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState<LoginForm>({
        email: "",
        password: ""
    });


    const handleLoginGoogle = async () => {
        setGoogleLoading(true)
        try {
            const res = await axiosCustomerConfig.get("/Auth/google-login")
            window.location.href = res.data
        } catch (error) {
            console.error("Error during Google login:", error)
            Swal.fire({
                icon: "error",
                title: "Đăng nhập thất bại",
                text: "Vui lòng thử lại sau",
            })
        } finally {
            setGoogleLoading(false)
        }
    }

    const handleLogin = async (values: LoginForm) => {

        if (!values.email || !values.password) {
            Swal.fire({
                icon: "warning",
                title: "Thông tin không đầy đủ",
                text: "Vui lòng nhập địa chỉ email và mật khẩu",
            });
            return;
        }

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
                window.location.href = "/"
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


    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="email" className="mb-2 block text-sm font-medium text-[#374151]">
                    Địa chỉ email
                </Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]" />
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Nhập địa chỉ email của bạn"
                        className="h-12 rounded-xl border border-[#d1d5db] pl-10 pr-4 bg-gray-100 text-[#111827] placeholder:text-[#9ca3af] focus:border-[#4ade80] focus:ring-[#4ade80]"
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="password" className="mb-2 block text-sm font-medium text-[#374151]">
                    Mật khẩu
                </Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]" />
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Nhâp mật khẩu của bạn"
                        className="h-12 rounded-xl border border-[#d1d5db] pl-10 pr-10 bg-gray-100 text-[#111827] placeholder:text-[#9ca3af] focus:border-[#4ade80] focus:ring-[#4ade80]"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 text-[#9ca3af] hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="remember"
                        className="h-4 w-4 rounded border-[#d1d5db] text-[#4ade80] focus:ring-[#4ade80]"
                    />
                    <Label htmlFor="remember" className="text-[#6b7280]">
                        Nhớ mật khẩu
                    </Label>
                </div>
                <a href="#" className="font-medium text-[#2563eb] hover:underline">
                    Quên mật khẩu?
                </a>
            </div>

            <Button
                onClick={() => handleLogin(formData)}
                disabled={loading}
                type="submit"
                className="h-12 w-full rounded-xl bg-[#4ade80] text-base font-semibold text-white hover:bg-[#34a853]"
            >
                Đăng nhập
            </Button>

            <Button
                onClick={handleLoginGoogle}
                disabled={googleLoading}
                type="button"
                variant="outline"
                className="h-12 w-full rounded-xl border border-[#d1d5db] bg-white text-base font-semibold text-[#111827] hover:bg-gray-50"
            >
                <Image
                    src="/images_v2/icon_google.svg"
                    alt="Google logo"
                    width={20}
                    height={20}
                    className="mr-2"
                />
                Tiếp tục với Google
            </Button>
        </div>
    );
}