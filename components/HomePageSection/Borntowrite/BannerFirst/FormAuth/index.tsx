"use client";

import axiosCustomerConfig from "@/libs/configs/axiosCustomerConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { getLastStudyLesion } from "@/_libs/services/ApiCustomerServices";

export default function AuthTabs() {

    const [isClient, setIsClient] = useState(false)

    const [isLogin, setIsLogin] = useState(false)

    const [logo, setLogo] = useState("")

    const router = useRouter();
    const [activeTab, setActiveTab] = useState("login");

    const [loginForm, setLoginForm] = useState({
        email: "user1",
        password: "123456"
    });

    const [registerForm, setRegisterForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState({
        login: false,
        register: false,
        confirmPassword: false
    });

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axiosCustomerConfig
            .post("/Auth/Login", loginForm)
            .then((response: any) => {
                if (response.code === 200) {
                    handleChangeStudyPage()
                } else {
                    toast.error("Tài khoản hoặc mật khẩu không đúng", {
                        duration: 3000,
                        position: "top-right"
                    });
                }
            })
            .catch((error) => {
                console.error("Error logging in:", error);
                toast.error("Tài khoản hoặc mật khẩu không đúng", {
                    duration: 3000,
                    position: "top-right"
                });
            });
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(registerForm);
        if (registerForm.password !== registerForm.confirmPassword) {
            toast.error("Mật khẩu không khớp", {
                duration: 3000,
                position: "top-right"
            });
            return;
        }

        axiosCustomerConfig
            .post("/Auth/Register", registerForm)
            .then((response: any) => {
                if (response.code === 201) {
                    toast.success("Đăng ký thành công, vui lòng đăng nhập", {
                        duration: 3000,
                        position: "top-right"
                    });
                } else {
                    toast.error("Đăng ký thất bại", {
                        duration: 3000,
                        position: "top-right"
                    });
                }
            })
            .catch((error) => {
                console.error("Error registering:", error);
            });
    };

    const handleChangeStudyPage = async () => {
        const response: any = await getLastStudyLesion()
        if (response.code !== 200) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại", {
                duration: 3000,
                position: "top-right"
            });
            return;
        } else {
            router.push(`/study/${response.data.slug}`)
        }
    }

    const handleLoginGoogle = () => {
        axiosCustomerConfig.get("/Auth/google-login")
            .then(res => {
                window.location.href = res.data
            })
    }

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const user = sessionStorage.getItem("user")
        if (user) {
            setIsLogin(true)
        } else {
            axiosCustomerConfig.get("/public/social-key?key=logo")
                .then((res: any) => {
                    setLogo(res.data)
                })
        }
    }, [isClient]);

    useEffect(() => {
        const handleHashChange = () => {
            const currentHash = window.location.hash;
            if (currentHash === "#dang-nhap") {
                setActiveTab("login");
            } else if (currentHash === "#dang-ky") {
                setActiveTab("register");
            }
        };

        window.addEventListener("hashchange", handleHashChange);
        handleHashChange();
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, [isClient]);

    if (!isClient) {
        return <></>;
    }

    if (isLogin) {
        return (
            <div className="max-w-[300px] rounded-lg p-8 text-center flex flex-col gap-10 items-center"
                onClick={handleChangeStudyPage}>
                <h2 className="-bold text-white mb-4 text-nowrap">
                    Chào mừng đồng nghiệp quay trở lại!
                </h2>
                <button
                    className="text-nowrap px-6 py-4 pb-5 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                    Tiếp tục học
                </button>
            </div>
        )
    }

    return (
        <div
            className="w-full max-w-[400px] bg-transparent rounded-lg overflow-hidden flex flex-col items-start justify-start">
            <div className="w-full bg-green-600 flex flex-row justify-start p-4 rounded-t-2xl">
                <div
                    className="flex-shrink-0 w-26 animate-shake animate-infinite animate-duration-[2000ms] animate-ease-in">
                    {logo && <Image
                        src={logo}
                        width={100}
                        height={100}
                        alt="banner-form-image"
                        className="w-full h-auto max-w-xs"
                    />}
                </div>
                <div className="text-white ">
                    <p className="mb-2 text-[16px]">Không nhập form rườm rà, không nhập thẻ,</p>
                    <p className="text-[14px]">không giới hạn thời gian - Đăng nhập là học ngay!</p>
                </div>
            </div>

            <div className="w-full bg-white rounded-b-xl shadow-xl p-8 overflow-hidden">

                <div className="flex flex-row items-center justify-center gap-4 w-full p-2 rounded-xl cursor-pointer border mb-2 border-gray-200"
                    onClick={() => handleLoginGoogle()}>
                    <span className="w-8">
                        <Image
                            src={"/assets/images/home/icon-gg.png"}
                            width={100}
                            height={100}
                            alt=""
                            className="cursor-pointer"
                        />
                    </span>
                    <span className="font-bold cursor-pointer">Tiếp tục với google</span>
                </div>

                <div
                    className="flex border-[#fbac3d] border-t-[12px] border-l-[8px] border-r-[8px]  bg-white rounded-t-xl transition-all overflow-hidden">
                    <button
                        className={`w-1/2 py-4 text-center font-semibold transition-all duration-300 relative ${activeTab === "register"
                            ? "text-[#fbac3d]"
                            : "text-white bg-[#fbac3d] rounded-br-[10rem]"
                            }`}
                        onClick={() => handleTabClick("register")}
                    >
                        Đăng ký ngay
                    </button>
                    <button
                        className={`w-1/2 py-4 text-center font-semibold transition-all duration-300 relative ${activeTab === "login"
                            ? "text-[#fbac3d]"
                            : "text-white bg-[#fbac3d] rounded-bl-[10rem]"
                            }`}
                        onClick={() => handleTabClick("login")}
                    >

                        Đăng nhập
                    </button>
                </div>

                <div className="w-full border-8 border-t-0 rounded-b-xl px-4 py-2 border-[#fbac3d] relative">
                    <div className="w-full h-fit m-auto mb-8">
                        {activeTab === "login" ?
                            <p className="text-[12px]">Không có thêm bước nào cả <span
                                className="text-[12px] text-[#7c0fd1]">Đăng ký là xem được ngay!</span></p>
                            : <p className="text-[12px] text-black-2">Chào mừng bạn đã quay lại với VuaContent. <span
                                className="text-[12px] text-[#7c0fd1]">Đăng nhập để bắt đầu học ngay!</span></p>}
                    </div>

                    {activeTab === "login" && (
                        <form onSubmit={handleLogin}
                            className="space-y-4 animate-flip-down animate-duration-100 animate-once animate-ease-linear">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder=""
                                    value={loginForm.email}
                                    onChange={handleLoginChange}
                                    className="peer w-full px-4 py-4 border-2 border-[#fbac3d] rounded-lg focus:outline-none focus:border-[#fbac3d] ring-1 ring-[#fbac3d] h-12"
                                    id="login-email"
                                />
                                <label
                                    htmlFor="login-email"
                                    className="absolute bg-white px-2 text-gray-500 duration-300 transform -translate-y-1/2 scale-75 top-0 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-1/2"
                                >
                                    Email của bạn
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder=""
                                    value={loginForm.password}
                                    onChange={handleLoginChange}
                                    className="peer w-full px-4 py-4 border-2 border-[#fbac3d] rounded-lg ring-1 ring-[#fbac3d] h-12"
                                    id="login-password"
                                />
                                <label
                                    htmlFor="login-password"
                                    className="absolute bg-white px-2 text-gray-500 duration-300 transform -translate-y-1/2 scale-75 top-0 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-1/2"
                                >
                                    Mật khẩu
                                </label>
                            </div>

                            <div className="text-gray-500">
                                Đăng nhập để tiếp tục học <a href="#" className="text-[#fbac3d]">Hoàn toàn miễn phí!</a>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center flex-row gap-2 justify-center font-medium text-white bg-[#8A2BE2] hover:bg-[#7B27CC] rounded-lg"
                            >
                                <span className="flex gap-2">
                                    <span
                                        className="text-yellow-300 font-bold animate-spin animate-infinite animate-duration-[2000ms] animate-ease-linear">
                                        <Image src={"/template/assets/images/home/icon-btn.png"} alt="" width={50} height={50} />
                                    </span>
                                </span>
                                <p className="font-[700]">ĐĂNG NHẬP NGAY <br /> <span className="text-[10px]">Hoàn toàn MIỄN PHÍ | Hiệu quả cao</span>
                                </p>
                            </button>

                        </form>
                    )}

                    {activeTab === "register" && (
                        <form onSubmit={handleRegister}
                            className="space-y-4 animate-flip-down animate-once animate-duration-100 animate-ease-linear">
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder=""
                                    value={registerForm.email}
                                    onChange={handleRegisterChange}
                                    className="peer w-full px-4 py-4 border-2 border-[#fbac3d] rounded-lg ring-1 ring-[#fbac3d] h-12"
                                    required
                                    id="register-email"
                                />
                                <label
                                    htmlFor="register-email"
                                    className="absolute bg-white px-2 text-gray-500 duration-300 transform -translate-y-1/2 scale-75 top-0 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-1/2"
                                >
                                    Email của bạn
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder=""
                                    value={registerForm.password}
                                    onChange={handleRegisterChange}
                                    className="peer w-full px-4 py-4 border-2 border-[#fbac3d] rounded-lg ring-1 ring-[#fbac3d] h-12"
                                    required
                                    id="register-password"
                                />
                                <label
                                    htmlFor="register-password"
                                    className="absolute bg-white px-2 text-gray-500 duration-300 transform -translate-y-1/2 scale-75 top-0 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-1/2"
                                >
                                    Mật khẩu
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder=""
                                    value={registerForm.confirmPassword}
                                    onChange={handleRegisterChange}
                                    className="peer w-full px-4 py-4 border-2 border-[#fbac3d] rounded-lg ring-1 ring-[#fbac3d] h-12"
                                    required
                                    id="register-confirm-password"
                                />
                                <label
                                    htmlFor="register-confirm-password"
                                    className="absolute bg-white px-2 text-gray-500 duration-300 transform -translate-y-1/2 scale-75 top-0 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-1/2"
                                >
                                    Xác nhận mật khẩu
                                </label>
                            </div>

                            <div className="text-gray-500">
                                Không có thêm bước nào cả <a href="#" className="text-[#fbac3d]">Đăng ký là xem được
                                    ngay!</a>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center flex-row gap-2 justify-center  font-medium text-white bg-[#8A2BE2] hover:bg-[#7B27CC] rounded-lg"
                            >
                                <span className="flex gap-2">
                                    <span
                                        className="text-yellow-300 font-bold animate-spin animate-infinite animate-duration-[2000ms] animate-ease-linear">
                                        <Image src={"/template/assets/images/home/icon-btn.png"} alt="" width={50} height={50} />
                                    </span>
                                </span>
                                <p className="font-[700]">ĐĂNG KÝ NGAY <br /> <span className="text-[10px]">Hoàn toàn MIỄN PHÍ | Hiệu quả cao</span>
                                </p>

                            </button>

                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}
