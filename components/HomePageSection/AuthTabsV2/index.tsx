"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axiosCustomerConfig from "@/libs/configs/ApiConfig/axiosCustomerConfig";
import Login from "./auth/login";
import Register from "./auth/register";
import Profile from "./auth/profile";


export default function AuthTabsV2() {
    const [tab, setTab] = useState<"login" | "register">("login");
    const [isClient, setIsClient] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);

    const handleGetInfoUser = async () => {
    try {
      const response: any = await axiosCustomerConfig.get("/customer/get-info")
      if (response.code === 200) {
        const authTabsV2Container = document.getElementById('auth-tabs-v2-container_v2');
        if (authTabsV2Container) {
            // authTabsV2Container.style.width = "600px";
            authTabsV2Container.style.height = "406px";
            authTabsV2Container.classList.add("bg-transparent");
        }
        setUserInfo(response.data)
      } else {
        console.error("Failed to fetch user info:", response.message)
      }
    } catch (error) {
      console.error("Error fetching user info:", error)

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
    }, []);

    return (
        <div className="flex items-center justify-center bg-[#ffffff] w-[500px] m-auto rounded-[12px]" id="auth-tabs-v2-container_v2">
            {
                userInfo && <Profile userInfo={userInfo} />
            }

            {!userInfo && <div className="w-full max-w-md rounded-2xl p-8">
                <div className="mb-6 flex justify-center rounded-xl bg-[#f9fafb] p-1">
                    <Button
                        onClick={() => setTab("login")}
                        variant="ghost"
                        className={`flex-1 rounded-xl px-4 py-2 text-base font-semibold  hover:bg-[#f3f4f6] ${tab === "login" ? "bg-[#f3f4f6] active:bg-[#e5e7eb] text-[#111827]" : "text-[#6b7280] "}`}
                    >
                        Đăng nhập
                    </Button>
                    <Button
                        onClick={() => setTab("register")}
                        variant="ghost"
                        className={`flex-1 rounded-xl px-4 py-2 text-base font-semibold hover:bg-[#f3f4f6] active:bg-[#e5e7eb] ${tab === "register" ? "bg-[#f3f4f6] active:bg-[#e5e7eb] text-[#111827]" : "text-[#6b7280] "}`}
                    >
                        Đăng ký
                    </Button>
                </div>

                <h1 className="mb-2 text-center text-2xl font-bold text-[#111827]">
                    {tab === "login" ? "Đăng nhập vào tài khoản của bạn" : "Tạo tài khoản mới"}
                </h1>
                <p className="mb-6 text-center text-sm text-[#10b981]">
                    Chào mừng trở lại! Tiếp tục hành trình học tập của bạn.
                </p>

                {tab === "login" ? (
                    <Login />
                ) : (
                    <Register />
                )}

                <p className="mt-6 text-center text-sm text-[#6b7280]">
                    {tab === "login" ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}{" "}
                    <a href="#" onClick={() => setTab(tab === "login" ? "register" : "login")} className="font-semibold text-[#10b981] hover:underline">
                        {tab === "login" ? "Đăng ký ngay" : "Quay lại đăng nhập"}
                    </a>
                </p>
            </div>}
        </div>
    )
}