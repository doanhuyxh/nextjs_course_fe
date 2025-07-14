'use client'

import { useState } from "react"
import axiosCustomerConfig from "@/libs/configs/ApiConfig/axiosCustomerConfig"
import Swal from "sweetalert2"

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleChangePassword = () => {

    if (!newPassword || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng nhập đầy đủ thông tin!",
        position: "top-end",
        confirmButtonText: "OK",
      })
      return
    }

    if (newPassword !== confirmPassword) {
        Swal.fire({
            icon: "error",
            title: "Lỗi",
            position: "top-end",
            text: "Mật khẩu không khớp, vui lòng kiểm tra lại!",
            confirmButtonText: "OK",
        })
      return
    }

    axiosCustomerConfig
      .post("/Customer/set-password", { newPassword })
      .then((res: any) => {
        const code = res.code
        if (code === 200) {
            Swal.fire({
                icon: "success",
                title: "Thành công",
                text: "Cập nhật mật khẩu thành công!",
                confirmButtonText: "OK",
            })
            setNewPassword("")
            setConfirmPassword("")
        } else {
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                position: "top-end",
                text: "Cập nhật mật khẩu thất bại",
                confirmButtonText: "OK",
            })
        }
      })
      .catch(() => {
        Swal.fire({
            icon: "error",
            title: "Lỗi",
            position: "top-end",
            text: "Cập nhật mật khẩu thất bại",
            confirmButtonText: "OK",
        })
      })
  }



  return (
    <div className="w-full">
      <div className="w-full px-4 py-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-color-secondary mb-8 text-center">
          Bổ sung mật khẩu
        </h1>

        <div className="space-y-6 p-10 bg-white rounded-lg shadow-lg">
          <div>
            <label className="block text-gray-700 font-medium text-lg mb-2">
              Mật khẩu mới
            </label>
            <input
              type="password"
              className="w-full px-5 py-4 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-color-primary"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-lg mb-2">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              className="w-full px-5 py-4 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-color-primary"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleChangePassword}
              className="cursor-pointer bg-color-primary hover:bg-color-primary-dark text-white font-semibold text-xl px-6 py-3 rounded-lg transition duration-200"
            >
              Cập nhật mật khẩu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
