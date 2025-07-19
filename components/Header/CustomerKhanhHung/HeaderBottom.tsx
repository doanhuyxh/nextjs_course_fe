'use client';

import React, { useEffect } from "react";
import HeaderLogo from "./HeaderLogo";
import Auth from "./Auth";

import { Customer } from "@/libs/types";
import { useSearchParams, usePathname } from "next/navigation";
import fetchData from "@/libs/configs/ApiConfig/fetchDataServer";

// Định nghĩa kiểu dữ liệu cho item trong menu
interface MenuItem {
  href: string;
  icon: string;
  text: string;
}

const HeaderBottom = () => {
  const [user, setUser] = React.useState<Customer>({} as Customer);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const pathname = useSearchParams();
  const path = usePathname();

  useEffect(() => {
    const accessToken = localStorage.getItem("AccessToken");
    fetchData("/customer/get-info", accessToken || "")
      .then((res: any) => {
        const code = res.code;
        if (code === 200) {
          setUser(res.data);
          sessionStorage.setItem("user", JSON.stringify(res.data));
        }else{
          window.location.href = "/";
        }
      });
  }, [path, pathname]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="flex items-center justify-between">
      <HeaderLogo />  
      <Auth user={user} />
    </div>
  );
}

export default HeaderBottom;
