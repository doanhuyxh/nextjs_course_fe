"use client"

import React, { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Check, FileText, HelpCircle, Users } from "lucide-react"
import { Spin } from "antd"
import useLocalStorage from "@/libs/hooks/useLocalStorage"
import Swal from "sweetalert2"
import axiosCustomerConfig from "@/libs/configs/ApiConfig/axiosCustomerConfig"
import VideoBunny from "./View/videobunny"
import VideoMp4 from "./View/videomp4"
import PDFViewer from "./View/pdf"
import { LessonItem } from "@/libs/types"

export default function VideoSectionV3({ lessonId }: { lessonId: string }) {

    const [lesson, setLesson] = useState<LessonItem | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [, setToggleCourse] = useLocalStorage<string>("toggleCourse", "");
    const [, setActiveLesson] = useLocalStorage<string>("ActiveLesson", "");
    const fetchVideoUrl = useCallback(async () => {
        try {
            setActiveLesson(lessonId);
            const response: any = await axiosCustomerConfig.get(`/course/get-lesson-by-id?id=${lessonId}`);
            if (response.code !== 200) {
                Swal.fire({
                    icon: "error",
                    text: "Bạn vui nâng cấp tài khoản để xem video này",
                    showConfirmButton: false,
                    timer: 2000,
                });
                return;
            }
            setLesson(response.data);
            setToggleCourse(response.data.courseId || "");
            setIsLoading(false);


        } catch (error) {
            console.error("Error fetching video URL:", error);
        } finally {
            setIsLoading(false);
        }
    }, [lessonId]);

    useEffect(() => {
        if (lessonId) {
            document.title = lesson?.name || "Video Lesson";
            fetchVideoUrl();
        }
    }, [lessonId, fetchVideoUrl, lesson?.name]);

   
    return (
        <div className="bg-white rounded-lg shadow-md p-6 col-span-1 lg:col-span-2">
            <div className="relative w-full m-auto aspect-video rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                <div className="flex items-center justify-center ">
                    {isLoading && (<div className="flex items-center justify-center w-full h-full">
                        <Spin />
                    </div>)}
                    {lesson?.type === "video_mp4" && lesson?.video && (
                        <VideoMp4 url={lesson.video} poster={lesson.imageThumbnail} />
                    )}
                    {lesson?.type === "video_bunny" && lesson?.video && (
                        <VideoBunny url={lesson.video} />
                    )}
                    {lesson?.type === "pdf" && lesson?.video && (
                        <PDFViewer url={lesson.video} name={lesson.name} />
                    )}
                </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-[#6b7280]">
                <span className="bg-[#dcfce7] text-[#15803d] px-2 py-1 rounded-full font-medium">Người mới bắt đầu</span>
                <span>{lesson?.duration}</span>
            </div>
            <h1 className="text-2xl font-bold text-[#111827] mt-2">{lesson?.name}</h1>
            <p className="text-[#4b5563] mt-2 leading-relaxed">
                Tìm hiểu những điều cơ bản và cách tạo tài khoản FlashBot và bắt đầu sử dụng nền tảng của chúng tôi.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
                <Button className="bg-[#ecfdf5] text-[#047857] hover:bg-[#d1fae5] rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Hoàn thành
                </Button>
                <Button
                    variant="outline"
                    className="rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 text-[#4b5563] border-[#e2e8f0] hover:bg-[#f3f4f6] bg-transparent"
                >
                    <FileText className="w-4 h-4" />
                    Ghi chú (0)
                </Button>
                <Button
                    variant="outline"
                    className="rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 text-[#4b5563] border-[#e2e8f0] hover:bg-[#f3f4f6] bg-transparent"
                >
                    <HelpCircle className="w-4 h-4" />
                    Nhận giúp đỡ
                </Button>
                <Button
                    variant="outline"
                    className="rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 text-[#4b5563] border-[#e2e8f0] hover:bg-[#f3f4f6] bg-transparent"
                >
                    <Users className="w-4 h-4" />
                    Cộng đồng
                </Button>
            </div>

            <div className="bg-gray-100 mt-6 p-4 rounded-lg">
                <div className="" dangerouslySetInnerHTML={{ __html: lesson?.lessonContent||"" }} />
            </div>

        </div>
    )
}