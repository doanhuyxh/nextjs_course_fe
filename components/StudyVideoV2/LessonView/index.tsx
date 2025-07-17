import axiosCustomerConfig from "@/libs/configs/ApiConfig/axiosCustomerConfig";
import { Spin } from "antd";
import { LessonItem } from "@/libs/types";
import { useEffect, useState, useCallback } from "react";
import useLocalStorage from "@/libs/hooks/useLocalStorage";
import Swal from "sweetalert2";


export default function LessonView({ lesson }: { lesson: LessonItem }) {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [lessonConetent, setLessonContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [, setToggleCourse] = useLocalStorage<string>("toggleCourse", "");
    const [, setActiveLesson] = useLocalStorage<string>("ActiveLesson", "");
    const fetchVideoUrl = useCallback(async () => {
        try {
            setActiveLesson(lesson.id);
            const response: any = await axiosCustomerConfig.get(`/course/get-lesson-by-id?id=${lesson.id}`);
            if (response.code !== 200) {
                Swal.fire({
                    icon: "error",
                    text: "Lấy nội dung bài học thất bại, vui lòng thử lại sau.",
                    showConfirmButton: false,
                    timer: 2000,
                });
                return;
            }
            setVideoUrl(response.data.video);
            setLessonContent(response.data.lessonContent);
            setToggleCourse(response.data.courseId || "");
            setIsLoading(false);


        } catch (error) {
            console.error("Error fetching video URL:", error);
        } finally {
            setIsLoading(false);
        }
    }, [lesson.id, setActiveLesson, setToggleCourse]);

    useEffect(() => {
        if (lesson) {
            document.title = lesson.name;
            fetchVideoUrl();
        }
    }, [lesson, fetchVideoUrl]);


    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="w-full h-fit bg-white shadow-lg rounded-lg overflow-hidden pb-5">
                <div className="m-auto h-full w-full lg:min-h-[60vh] min-h-[30vh] flex items-center justify-center">
                    {(isLoading || !videoUrl) && (
                        <div className="flex items-center justify-center w-full h-full">
                            <Spin size="large" />
                        </div>
                    )}
                    {videoUrl && (
                        <video
                            className="w-full h-full"
                            controls
                            src={videoUrl}
                            poster={lesson.imageThumbnail || "/default-thumbnail.jpg"}
                        />
                    )}
                </div>

                <div className="flex flex-col px-5 mt-5">
                    <h1 className="text-2xl font-bold">{lesson.name}</h1>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-800">Thời lượng:</span>
                            <span>{lesson.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-800">Lượt xem:</span>
                            <span>{lesson.totalView}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                            Danh mục: {lesson.isOutstanding ? "Nổi bật" : "Thường"}
                        </span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {lesson.isFree ? "Miễn phí" : "Có phí"}
                        </span>
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {lesson.isImportant ? "Quan trọng" : "Không quan trọng"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-gray-300 bg-opacity-20 p-4 rounded-lg min-h-[300px] border border-gray-300 shadow-3">
                <h4 className="text-lg font-semibold mb-2">Nội dung bài học</h4>
                <hr className="mb-4 bg-black h-0.5" />
                <div className="" dangerouslySetInnerHTML={{ __html: lessonConetent || "" }} />
            </div>
        </div>


    );
}