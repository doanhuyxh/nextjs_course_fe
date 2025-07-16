'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import Link from "next/link";

const HeaderLogo = () => {

  const [isClient, setIsClient] = useState(false)
  const [logo, setLogo] = useState('')
  const { toggleSidebar, isMobile } = useSidebar()

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      fetch(process.env.API_URL + "/api/v1" + "/public/social-key?key=logo")
        .then(res => res.json())
        .then(res => {
          if (res.code === 200) {
            setLogo(res.data)
            localStorage.setItem("logo", res.data)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [isClient])

  if (!isClient) return <></>

  return (
    <div className="px-1">
      {isMobile && (
        <button onClick={toggleSidebar} className="text-black">
          <Menu className="w-6 h-6" />
        </button>
      )}
      {logo && !isMobile && <Link href="/">
        <span>
          {logo && <Image src={logo} alt="logo" width={100} height={100} />}
        </span>
      </Link>}
    </div>
  );
}
export default HeaderLogo;