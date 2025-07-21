import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axiosCustomerNestJsConfig from "@/libs/configs/ApiConfig/axiosBackEndNesjs";
import axiosCustomerConfig from "@/libs/configs/ApiConfig/axiosCustomerConfig";
import Image from "next/image";
import Swal from "sweetalert2";
import useSearchParamsClient from "@/libs/hooks/useSearchParamsClient";

interface RegisterForm {
    email: string
    password: string
    fullName: string
}


export default function Register() {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [googleLoading, setGoogleLoading] = useState<boolean>(false);
    const [utm_source] = useSearchParamsClient('utm_source', '')
    const [formData, setFormData] = useState<RegisterForm>({
        email: "",
        password: "",
        fullName: ""
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

    const handleRegister = async (values: RegisterForm) => {
        setLoading(true)
        if (!values.email || !values.password || !values.fullName) {
            Swal.fire({
                icon: "warning",
                title: "Thông tin không đầy đủ",
                text: "Vui lòng điền đầy đủ thông tin đăng ký",
            })
            setLoading(false)
            return;
        }

        const nameParts = values.fullName.trim().split(" ");
        let firstName = "";
        let lastName = "";
        if (nameParts.length < 2) {
            firstName = values.fullName.trim();
        } else {
            firstName = nameParts.slice(0, -1).join(" ").trim();
            lastName = nameParts[nameParts.length - 1].trim();
        }

        try {
            const response: any = await axiosCustomerNestJsConfig.post("/auth/register", {
                email: values.email,
                password: values.password,
                firstName: firstName,
                lastName: lastName,
                utm_source: utm_source ? utm_source : ""
            })
            if (response.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Đăng ký thành công",
                    text: "Vui lòng đăng nhập để tiếp tục",
                })
            } else if (response.status === 409) {
                Swal.fire({
                    icon: "warning",
                    title: "Email đã được sử dụng",
                    text: "Vui lòng sử dụng email khác để đăng ký",
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Đăng ký thất bại",
                    text: response.data.message || "Vui lòng kiểm tra lại thông tin đăng ký",
                })
            }

        } catch (error: any) {

            if (error.response && error.response.status === 409) {
                Swal.fire({
                    icon: "warning",
                    title: "Email đã được sử dụng",
                    text: "Vui lòng sử dụng email khác để đăng ký",
                });
                return;
            }

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
                    Họ và tên đầy đủ
                </Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]" />
                    <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Nhập họ và tên của bạn"
                        className="h-12 rounded-xl border border-[#d1d5db] pl-10 pr-4 bg-gray-100 text-[#111827] placeholder:text-[#9ca3af] focus:border-[#4ade80] focus:ring-[#4ade80]"
                    />
                </div>
            </div>
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
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu của bạn"
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

            {/* <div className="flex items-start gap-2 text-sm flex-wrap flex-col justify-start">
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
            </div> */}
            <Button
                type="submit"
                onClick={() => handleRegister(formData)}
                disabled={loading}
                className="w-full h-12 rounded-xl bg-[#10b981] text-white hover:bg-[#059669] focus:ring-2 focus:ring-[#10b981]"
            >
                Đăng ký
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
    )
}