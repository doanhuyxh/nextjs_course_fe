"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axiosCustomerConfig from "@/libs/configs/ApiConfig/axiosCustomerConfig";
import Login from "./auth/login";
import Register from "./auth/register";
import Profile from "./auth/profile";
import useSearchParamsClient from "@/libs/hooks/useSearchParamsClient";


export default function AuthTabsV2() {
    const [tab, setTab] = useState<"login" | "register">("login");
    const [isClient, setIsClient] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [useCheckLogin] = useSearchParamsClient<string>("redirect", "");

    const handleGetInfoUser = async () => {
        try {
            setIsLoading(true);
            const response: any = await axiosCustomerConfig.get("/customer/get-info")
            if (response.code === 200) {
                setUserInfo(response.data)

                const authTabsV2Container = document.getElementById('auth-tabs-v2-container_v2');
                if (authTabsV2Container) {
                    // authTabsV2Container.style.width = "600px";
                    if (window.innerWidth < 768) {
                        authTabsV2Container.style.height = "auto";
                    }
                    else {
                        authTabsV2Container.style.height = "406px";
                    }
                    authTabsV2Container.classList.add("bg-transparent");
                }

            } else {
                console.error("Failed to fetch user info:", response.message)
            }
        } catch (error) {
            console.error("Error fetching user info:", error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (useCheckLogin === "study") {
            const authTabsV2Container = document.getElementById('auth-tabs-v2');
            if (authTabsV2Container && window.innerWidth < 768) {
                authTabsV2Container.scrollIntoView({ behavior: "smooth" });
            } else if (authTabsV2Container) {
                const yOffset = -200;
                const y = authTabsV2Container.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });

            }
        }
    }, [useCheckLogin]);


    useEffect(() => {
        if (!isClient) {
            return
        }
        const accessToken = localStorage.getItem("AccessToken")
        if (!accessToken) {
            setIsLoading(false);
            return
        }
        handleGetInfoUser()

    }, [isClient])


    useEffect(() => {
        setIsClient(true)
    }, []);

    if (!isClient) {
        return null;
    }


    return (
        <div className="flex items-center justify-center bg-[#ffffff] w-full lg:w-[500px] m-auto rounded-[12px]" id="auth-tabs-v2-container_v2">
            {
                userInfo && !isLoading && <Profile userInfo={userInfo} />
            }

            {!userInfo && !isLoading && <div className="w-full max-w-md rounded-2xl lg:p-8 p-4">
                <div className="mb-6 flex justify-center rounded-xl bg-[#f9fafb] p-1" id="auth-tabs-v2-buttons">
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

                {useCheckLogin == "study" && tab === "login" &&
                    <p className="mb-3 text-center font-normal text-[11px] text-red-500 leading-[12px] animate-bounce">
                        Vui lòng đăng nhập để xem video
                    </p>
                }

                <h1 className="mb-2 text-center text-[20px] font-bold text-[#111827] text-nowrap leading-[32px]">
                    {tab === "login" ? "Đăng nhập vào FlashBot" : "Tạo tài khoản mới"}
                </h1>
                <p className="mb-6 text-center font-normal text-[11px] text-[#10b981] leading-[20px]">
                    Chào mừng trở lại! Tiếp tục hành trình học tập của bạn.
                </p>

                {tab === "login" ? (
                    <Login />
                ) : (
                    <Register />
                )}

                <p className="mt-6 text-center text-sm text-[#6b7280]">
                    {tab === "login" ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}{" "}
                    <button onClick={() => setTab(tab === "login" ? "register" : "login")} className="font-semibold text-[#10b981] hover:underline">
                        {tab === "login" ? "Đăng ký ngay" : "Quay lại đăng nhập"}
                    </button>
                </p>
            </div>}
        </div>
    )
}