'use client'

import axios from 'axios';
import { ResponseData } from '@/libs/types';

const axiosCustomerConfig = axios.create({
  baseURL: `${process.env.API_URL}/api/v1`,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});


axiosCustomerConfig.interceptors.response.use(
  async (response) => {
    const code = response.data.code
    if (code == 401) {
      const headers = {
        "refreshToken": localStorage.getItem("RefreshToken") || ""
      };
      const res_refresh: ResponseData = await axiosCustomerConfig.post("/Auth/RefreshToken", {}, { headers });
      const code_res = res_refresh.code
      if (code_res == 200) {
        localStorage.setItem("RefreshToken", res_refresh.data.refreshToken);
        localStorage.setItem("AccessToken", res_refresh.data.accessToken);
        axiosCustomerConfig.defaults.headers.common['Authorization'] = `Bearer ${res_refresh.data.accessToken}`;

        const originalRequest = response.config;
        const newAccessToken = res_refresh.data.accessToken;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosCustomerConfig
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
        await axiosCustomerConfig.post("/Auth/RefreshToken", {}, {
          headers: { "RefreshToken": localStorage.getItem("RefreshToken") || "" }
        })
        return axiosCustomerConfig

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
  return axiosCustomerConfig.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('AccessToken');
  if (token) {
    axiosCustomerConfig.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default axiosCustomerConfig;