import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axiosCustomerNestJsConfig from "@/libs/configs/ApiConfig/axiosBackEndNesjs";
import Swal from "sweetalert2";

interface RegisterForm {
    email: string
    password: string
    confirmPassword: string
}


export default function Register() {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<RegisterForm>({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleRegister = async (values: RegisterForm) => {
        setLoading(true)

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
                setFormData({
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
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
                        placeholder="Enter your email"
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
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
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

            <div className="flex items-start gap-2 text-sm flex-wrap flex-col justify-start">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="terms"
                        className="h-4 w-4 rounded border border-[#d1d5db] bg-gray-100 text-[#10b981] focus:ring-[#10b981]"
                    />
                    <Label htmlFor="terms" className="text-sm text-[#374151]">
                        Tôi đồng ý với các điều khoản và điều kiện
                    </Label>
                </div>
                <a href="#" className="text-sm text-[#10b981] hover:underline">
                    Xem điều khoản
                </a>
            </div>
            <Button
                type="submit"
                onClick={() => handleRegister(formData)}
                disabled={loading}
                className="w-full h-12 rounded-xl bg-[#10b981] text-white hover:bg-[#059669] focus:ring-2 focus:ring-[#10b981]"
            >
                Đăng ký
            </Button>


        </div>
    )
}