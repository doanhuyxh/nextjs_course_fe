'use client'

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axiosCustomerConfig from '@/libs/configs/axiosCustomerConfig';
export default function LoadingSocial() {
  const query = useSearchParams();
  const code = query.get("code");
  const router = useRouter();
  const ChangeStudyPage = async () => {
      const response = await axiosCustomerConfig.get("/course/get-last-lesson");
      const data = response.data;
      window.location.href = `/study/${data}`;
  }

  useEffect(() => {
    if (code) {
      axiosCustomerConfig.get(`/Auth/google-callback?code=${code}`)
        .then((response: any) => {
          if (response.code === 200) {
            ChangeStudyPage()
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
