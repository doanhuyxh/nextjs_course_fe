'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axiosCustomerConfig from '@/libs/configs/ApiConfig/axiosCustomerConfig';
import { CourseData, LessonItem } from '@/libs/types';
import LessonView from '@/components/StudyVideoV2/LessonView';
import ListCourse from '@/components/StudyVideoV2/ListCourse';
import { Spin } from 'antd';

export default function StudyPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const listLessonsRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);
  const { lessonSlug } = useParams() as { lessonSlug: string };
  const [course, setCourse] = useState<CourseData[] | []>([]);
  const [lesson, setLesson] = useState<LessonItem | null>(null);
  const [loading, setLoading] = useState(true);


  const getLesson = useCallback(async (slug: string) => {
    try {
      const response: any = await axiosCustomerConfig.get(`/public/get-lesson-share?slug=${slug}`);
      if (response.code !== 200) {
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
        console.log('Failed to fetch last lesson:', response.message);
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

    if (!isMounted || loading) {
      return;
    }

    if (!containerRef.current || !listLessonsRef.current) {
      return;
    }

    console.log('Adjusting layout for container and list lessons');

    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const listLessonsHeight = listLessonsRef.current?.clientHeight || 0;
      const contentHeight = containerHeight - listLessonsHeight - 100; // Adjust as needed
      listLessonsRef.current?.style.setProperty('height', `${contentHeight}px`);
    }
  }, [containerRef, listLessonsRef, isMounted, loading]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }
    const token = localStorage.getItem('AccessToken');
    if (!token) {
      localStorage.clear();
      sessionStorage.clear();
      router.push('/');
      return;
    }
    if (!lessonSlug) {
      getLastLesson()
    } else {
      getLesson(lessonSlug)
    }

    setLoading(false);

  }, [lessonSlug, isMounted, getLastLesson, router, getLesson]);

  useEffect(() => {
    setIsMounted(true);
    getAllCourse();
  }, [getAllCourse]);

  if (!isMounted) {
    return <Spin className="w-full h-screen flex items-center justify-center" />;
  }

  return (
    <div className="flex flex-col lg:flex-row items-stretch mt-3" ref={containerRef}>
      {/* Cột bài học - chiếm 2 phần */}
      <div className="w-full px-4 pb-3">

        {loading && (
          <div className="flex items-center justify-center h-full">
            <Spin size="large" />
          </div>
        )}

        {
          !lesson && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">
                Bài học đang được cập nhật 
              </p>
            </div>
          )
        }

        {lesson && (
          <LessonView lesson={lesson} />
        )}
      </div>

      {/* Cột bên phải - chiếm 1 phần */}
      <div className="lg:w-[600px] w-full" ref={listLessonsRef}>
        <ListCourse coursesData={course || []} containerRef={containerRef} />
      </div>

    </div>
  );

}
