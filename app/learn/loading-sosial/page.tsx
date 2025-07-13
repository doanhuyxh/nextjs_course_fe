'use client'

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axiosCustomerConfig from '@/libs/configs/ApiConfig/axiosCustomerConfig';
import fetchDataServer from '@/libs/configs/ApiConfig/fetchDataServer';
export default function LoadingSocial() {
  const query = useSearchParams();
  const code = query.get("code");
  const router = useRouter();
  // const ChangeStudyPage = async (accessToken: string) => {
  //   const response = await fetchDataServer("/course/get-last-lesson", accessToken);
  //   console.log(response.data);
  //   const data = response.data;
  //   //window.location.href = `/study/${data}`;
  // }

  useEffect(() => {
    if (code) {
      axiosCustomerConfig.get(`/Auth/google-callback?code=${code}`)
        .then((response: any) => {
          if (response.code === 200) {
            localStorage.setItem("AccessToken", response.data.accessToken);
            localStorage.setItem("RefreshToken", response.data.refreshToken);
            document.cookie = `AccessToken=${response.data.accessToken}; path=/;`;
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
