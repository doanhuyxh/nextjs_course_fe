'use client';

import { useEffect, useState, useCallback, use } from 'react';
import { useParams } from 'next/navigation';

import axiosCustomerConfig from '@/libs/configs/ApiConfig/axiosCustomerConfig';

import { CourseData, LessonItem } from '@/libs/types';
import StudyPageComponent from './_component';
import { Spin } from 'antd';

export default function StudyPage() {

  const [isMounted, setIsMounted] = useState(false);
  const { lessonSlug } = useParams() as { lessonSlug: string };
  const [course, setCourse] = useState<CourseData | null>(null);
  const getAllCourse = useCallback(async () => {
    try {
      const response: any = await axiosCustomerConfig.get(`/course/GetAllCourse`);
      if (response.code !== 200) {
        console.error('Failed to fetch course data:', response.message);
        return null;
      }
      const data = response.data;
      setCourse(data);
    } catch (error) {
      return null;
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    getAllCourse();
  }, [getAllCourse]);

  if (!isMounted) {
    return <Spin className="w-full h-screen flex items-center justify-center" />;
  }

}
