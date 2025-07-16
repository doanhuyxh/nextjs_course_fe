'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BurgerIcon } from "../../Icon";
import Link from "next/link";

const HeaderLogo = () => {

  const [isClient, setIsClient] = useState(false)
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  const [logo, setLogo] = useState('')

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
    <>
      <div className="header_bottom_wrapper_left">
        <BurgerIcon isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
        {logo && <Link href="/">
          <span>
            {logo && <Image src={logo} alt="logo" width={100} height={100} />}
          </span>
        </Link>}
      </div>
    </>
  );
}
export default HeaderLogo;