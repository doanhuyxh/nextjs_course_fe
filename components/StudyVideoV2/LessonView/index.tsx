import { LessonItem } from "@/libs/types";
import { useEffect, useState } from "react";


export default function LessonView({ lesson }: { lesson: LessonItem }) {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchVideoUrl = async () => {
        
    }

    useEffect(() => {
        if (lesson) {
            document.title = lesson.name;
        }
    }, [lesson]);


    return (
        <div className="w-full h-full">
            <div className="flex flex-col gap-10">
                <div className="w-full bg-white shadow-md rounded-lg">
                    <div className="aspect-video px-5 py-4">
                        <video
                            className="w-full h-full rounded-lg"
                            controls
                        >
                            Trình duyệt của bạn không hỗ trợ video.
                        </video>
                    </div>
                    <div className="flex flex-col p-5">
                        <h1 className="text-2xl font-bold mb-2">{lesson.name}</h1>
                        <div className="flex flex-wrap gap-3">
                            <p className="text-gray-500">Thời lượng: {lesson.duration}</p>
                            <p className="text-gray-500">Số lượt xem: {lesson.totalView}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-500 bg-opacity-20 p-4 rounded-lg min-h-[300px] border border-gray-300 shadow-3">
                    <h4 className="text-lg font-semibold mb-2">Nội dung bài học</h4>
                    <hr className="mb-4 bg-black h-0.5" />
                    <div className="" dangerouslySetInnerHTML={{ __html: lesson.description || "" }} />
                </div>
            </div>
        </div>

    );
}