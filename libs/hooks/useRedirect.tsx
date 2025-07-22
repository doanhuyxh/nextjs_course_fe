import axiosInstanceAdmin from "../configs/ApiConfig/axiosAdminConfig";
import axiosInstanceCustomer from "../configs/ApiConfig/axiosCustomerConfig";
import { toast } from "react-hot-toast";

export async function handleRedirectAdmin(id: string, redirectUrl: string) {
    try {
        const res: any = await axiosInstanceAdmin.get(`/customer/login-bot-chat?id=${id}`);
        if (res.code === 200) {
            const accessToken = res.data.access_token;
            const queryString = new URLSearchParams({ access_token: accessToken }).toString();
            window.open(`https://flashbot.vn/admin/${redirectUrl}?${queryString}`, "_blank");
        } else {
            toast.error("Đăng nhập bot chat thất bại", {
                duration: 4000,
                style: {
                    backgroundColor: '#ff4444',
                    color: '#fff',
                }
            });
        }
    } catch (error) {
        toast.error("Đăng nhập bot chat thất bại", {
            duration: 4000,
            style: {
                backgroundColor: '#ff4444',
                color: '#fff',
            }
        });
    }
}

export async function handleRedirectCustomer(id: string, redirectUrl: string) {
    try {
        const res: any = await axiosInstanceCustomer.get(`/customer/login-bot?id=${id}`);
        if (res.code === 200) {
            const accessToken = res.data.access_token;
            const queryString = new URLSearchParams({ access_token: accessToken }).toString();
            window.open(`https://flashbot.vn/admin/${redirectUrl}?${queryString}`, "_blank");
        } else {
            toast.error("Đăng nhập bot chat thất bại", {
                duration: 4000,
                style: {
                    backgroundColor: '#ff4444',
                    color: '#fff',
                }
            });
        }
    } catch (error) {
        toast.error("Đăng nhập bot chat thất bại", {
            duration: 4000,
            style: {
                backgroundColor: '#ff4444',
                color: '#fff',
            }
        });
    }
}