'use client'

import axios from 'axios';
import { ResponseData } from '@/libs/types';

const axiosCustomerConfigV2 = axios.create({
  baseURL: `${process.env.API_URL}/api/v2`,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


axiosCustomerConfigV2.interceptors.response.use(
  async (response) => {
    const code = response.data.code
    if (code == 401) {
      const headers = {
        "refreshToken": localStorage.getItem("RefreshToken") || ""
      };
      const res_refresh: ResponseData = await axiosCustomerConfigV2.post("/Auth/RefreshToken", {}, { headers });
      const code_res = res_refresh.code
      if (code_res == 200) {
        localStorage.setItem("RefreshToken", res_refresh.data.refreshToken);
        localStorage.setItem("AccessToken", res_refresh.data.accessToken);
        axiosCustomerConfigV2.defaults.headers.common['Authorization'] = `Bearer ${res_refresh.data.accessToken}`;
        document.cookie = `AccessToken=${res_refresh.data.accessToken}; path=/; max-age=3600; secure; SameSite=None`;
        return axiosCustomerConfigV2
      } else {
        localStorage.clear()
        sessionStorage.clear()
        document.cookie = ""
      }
    }
    const data = response.data;
    return data;
  },
  async (error) => {
    if (error.response) {

      if (error.code == 401) {
        await axiosCustomerConfigV2.post("/Auth/RefreshToken", {}, {
          headers: { "RefreshToken": localStorage.getItem("RefreshToken") || "" }
        })
        return axiosCustomerConfigV2

      } else {
        return Promise.reject(error.response.data);
      }
    }

    if (error.code == "ERR_NETWORK") {
      return Promise.resolve({ code: 500, data: [], message: "Lỗi kết nối mạng" })
    }

  }

);

export const postFormData = (url: string, data: any) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return axiosCustomerConfigV2.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('AccessToken');
  if (token) {
    axiosCustomerConfigV2.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default axiosCustomerConfigV2;