'use client'

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axiosCustomerConfig from '@/libs/configs/ApiConfig/axiosCustomerConfig';

export default function LoadingSocial() {
  const query = useSearchParams();
  const code = query.get("code");
  const router = useRouter();

  useEffect(() => {
    if (code) {
      axiosCustomerConfig.get(`/Auth/google-callback?code=${code}`)
        .then((response: any) => {
          if (response.code === 200) {
            localStorage.setItem("AccessToken", response.data.accessToken);
            localStorage.setItem("RefreshToken", response.data.refreshToken);
            axiosCustomerConfig.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
            router.push('/study');
          } else {
            router.push('/');
          }
        })
        .catch(() => {
          router.push('/');
        });
    } else {
      router.push('/');
    }
  }, [code, router]);

  return null;
}
