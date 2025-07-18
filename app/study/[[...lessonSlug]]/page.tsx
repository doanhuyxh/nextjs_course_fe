"use client"

import { useCallback, useEffect, useState } from "react";
import HeaderStudyVideoV3 from "@/components/StudyVideoV3/heder"
import VideoSectionV3 from "@/components/StudyVideoV3/videoSection"
import CoursePlaylistSection from "@/components/StudyVideoV3/coursePlaylistSection"
import { useParams } from "next/navigation"
import axiosCustomerConfig from "@/libs/configs/ApiConfig/axiosCustomerConfig";
import { LessonItem } from "@/libs/types";
import { useRouter } from "next/navigation";

export default function StudyPageV3() {
  const router = useRouter();
  const { lessonSlug } = useParams() as { lessonSlug: string };
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState<LessonItem | null>(null);
  
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
  }, []);

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      {/* Top Navigation Bar */}
      <HeaderStudyVideoV3 />
      {/* Main Content Area */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr_0.8fr] gap-6">
        {/* Video Player Section */}
        <VideoSectionV3 lessonId={lesson?.id||""} />
        {/* Course Playlist Section */}
        <CoursePlaylistSection />
        {/* Right Sidebar */}
      </main>
    </div>
  )
}
