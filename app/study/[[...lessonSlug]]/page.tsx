'use client';

import { useEffect, useState, useCallback, use } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axiosCustomerConfig from '@/libs/configs/ApiConfig/axiosCustomerConfig';
import { CourseData, LessonItem } from '@/libs/types';
import LessonView from '@/components/StudyVideoV2/LessonView';
import ListCourse from '@/components/StudyVideoV2/ListCourse';
import { Spin } from 'antd';

export default function StudyPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { lessonSlug } = useParams() as { lessonSlug: string };
  const [course, setCourse] = useState<CourseData[] | []>([]);
  const [lesson, setLesson] = useState<LessonItem | null>(null);


  const getLesson = useCallback(async (slug: string) => {
    try {
      const response: any = await axiosCustomerConfig.get(`/public/get-lesson-share?slug=${slug}`);
      if (response.code !== 200) {
        console.error('Failed to fetch lesson:', response.message);
        return null;
      }
      const data = response.data;
      setLesson(data);
      return data;
    } catch (error) {
      console.error('Error fetching lesson:', error);
      return null;
    }
  }, []);

  const getLastLesson = useCallback(async () => {
    try {
      const response: any = await axiosCustomerConfig.get(`/course/get-last-lesson`);
      if (response.code !== 200) {
        console.error('Failed to fetch last lesson:', response.message);
        return null;
      }
      const data = response.data;
      await getLesson(data)
    } catch (error) {
      console.error('Error fetching last lesson:', error);
      return null;
    }
  }, [getLesson]);

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
    if (!isMounted) {
      return;
    }
    const token = localStorage.getItem('AccessToken');
    if (!token) {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(';').forEach((cookie) => {
        document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });
      router.push('/');
      return;
    }
    if (!lessonSlug) {
      getLastLesson()
    } else {
      getLesson(lessonSlug)
    }


  }, [lessonSlug, isMounted, getLastLesson, router, getLesson]);

  useEffect(() => {
    setIsMounted(true);
    getAllCourse();
  }, [getAllCourse]);

  if (!isMounted) {
    return <Spin className="w-full h-screen flex items-center justify-center" />;
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-col lg:flex-row ">
        {/* Cột bài học - chiếm 2 phần */}
        <div className="w-full p-4">
          {lesson ? (
            <LessonView lesson={lesson} />
          ) : (
            <div className="text-center text-gray-500">Loading lesson...</div>
          )}
        </div>

        {/* Cột bên phải - chiếm 1 phần */}
        <div className="lg:w-[600px] w-full max-h-[100%]">
          <ListCourse coursesData={course || []} />
        </div>

      </div>
    </div>
  );

}
