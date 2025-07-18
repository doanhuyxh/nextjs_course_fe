'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ImageUpload from "@/components/FileHandle/Image";
import VideoMp4UploadFull from "@/components/FileHandle/VideoMp4";
import { EditorReactQuill } from "@/components/Editor";
import axiosInstance, { postFormData } from "@/libs/configs/ApiConfig/axiosAdminConfig";
import toast from "react-hot-toast";
import { generateSlug } from "@/libs/utils/index";
import VideoBunny from "@/components/FileHandle/VideoM3U8";
import VideoYoutubeUpload from "@/components/FileHandle/VideoYoutube";
import FileUploadPDF from "@/components/FileHandle/FileUploadPDF";
import { MemberType } from "@/libs/types";


export default function CourseForm() {

    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const id = searchParams?.get('id');
    const router = useRouter();
    const [title, setTitle] = useState('Tạo khoá học mới');


    const [course, setCourse] = useState({
        Id: "",
        Name: '',
        Slug: "",
        Image: '',
        VideoIntro: '',
        CourseContent: '',
        NumberOfLessons: 0,
        TotalTimeDuration: '',
        Status: 'draft',
        MemberType: "free",
        VideoType: "video_youtube",

    });

    const handleEditorChangeCourseContent = (content: string) => {
        setCourse({ ...course, CourseContent: content });
    };

    const HandleSaveCourse = async () => {
        if (id) {
            course.Id = id;
        }
        const res: any = await postFormData('/course/CreateOrUpdateCourse', course);
        if (res.code == 200) {
            toast.success('Lưu khoá học thành công');
            router.push('/admin_web/course');
        } else {
            toast.error('Lưu khoá học thất bại, Vui lòng điền đầy đủ thông tin');
        }
    }


    useEffect(() => {
        if (id) {
            setTitle('Cập nhật khoá học');
            axiosInstance.get(`/course/GetCourseById?id=${id}`).then((res) => {
                const data = res.data;
                setCourse({
                    Id: data.id,
                    Name: data.name,
                    Slug: data.slug,
                    Image: data.image,
                    VideoIntro: data.videoIntro,
                    CourseContent: data.courseContent,
                    NumberOfLessons: data.numberOfLessons,
                    TotalTimeDuration: data.totalTimeDuration,
                    Status: data.status,
                    MemberType: data.memberType,
                    VideoType: data.videoType || "video_youtube",
                });
            })
        }
        setLoading(false);
    }, [id]);

    if (loading) {
        return null;
    }

    return (
        <div className="p-5">
            <button className='float-left hover:bg-blue-400 px-4 py-3 rounded-md' onClick={() => router.push('/admin_web/course')}>
                <i className="fa-solid fa-arrow-left" style={{ color: "#1c6bf2" }}></i>
            </button>
            <h1 className="text-center text-2xl font-bold mb-5">{title}</h1>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-white p-4 rounded-lg">
                    <div className="rounded-lg p-4 shadow-sm">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tên khoá học
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Nhập tên khoá học"
                                value={course.Name}
                                onChange={(e) => setCourse({ ...course, Name: e.target.value, Slug: generateSlug(e.target.value) })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Slug (phục vụ SEO)
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Slug tự động tạo từ tên bài học"
                                value={course.Slug}
                                onChange={(e) => setCourse({ ...course, Slug: e.target.value })}
                            />
                        </div>


                        <div className="grid grid-cols-3 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tổng số bài học
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="Số lượng bài học"
                                    value={course.NumberOfLessons}
                                    onChange={(e) => setCourse({ ...course, NumberOfLessons: Number(e.target.value) })}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Thời gian học
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="Thời gian học"
                                    value={course.TotalTimeDuration}
                                    onChange={(e) => setCourse({ ...course, TotalTimeDuration: e.target.value })}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Loại thành viên
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={course.MemberType}
                                    onChange={(e) => setCourse({ ...course, MemberType: e.target.value })}>
                                    {
                                        MemberType.map((item) => (
                                            <option key={item.value} value={item.value.trim()}>
                                                {item.label}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nội dung khoá mục
                            </label>
                            <EditorReactQuill value={course.CourseContent} onChange={handleEditorChangeCourseContent} />
                        </div>
                    </div>
                </div>


                <div className="col-span-1 ">
                    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Trạng thái
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={course.Status}
                                onChange={(e) => setCourse({ ...course, Status: e.target.value })}>
                                <option value="draft">Nháp</option>
                                <option value="published">Công khai</option>
                                <option value="hidden">Ẩn</option>
                            </select>
                        </div>

                        <ImageUpload initialLink={course.Image} onChange={(value) => setCourse({ ...course, Image: value })} />

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row items-center gap-3">
                                <label className="font-semibold">Loại bài học</label>
                                <div className="flex flex-row gap-2">
                                    <label className="cursor-pointer">Video YouTube <input type="radio" value={"video_youtube"} checked={course.VideoType === "video_youtube"} onChange={(e) => setCourse({ ...course, VideoType: e.target.value })} /></label>
                                    <label className="cursor-pointer">Video MP4 <input type="radio" value={"video_mp4"} checked={course.VideoType === "video_mp4"} onChange={(e) => setCourse({ ...course, VideoType: e.target.value })} /></label>
                                    <label className="cursor-pointer">Video Bunny <input type="radio" value={"video_bunny"} checked={course.VideoType === "video_bunny"} onChange={(e) => setCourse({ ...course, VideoType: e.target.value })} /></label>
                                    <label className="cursor-pointer">PDF <input type="radio" value={"pdf"} checked={course.VideoType === "pdf"} onChange={(e) => setCourse({ ...course, VideoType: e.target.value })} /></label>
                                </div>
                            </div>

                            {course.VideoType === "video_bunny" && (<div>
                                <VideoBunny initialLink={course.VideoIntro} onChange={(value) => setCourse({ ...course, VideoIntro: value })} setDuration={(value) => setCourse({ ...course, TotalTimeDuration: value })} />
                            </div>)}


                            {course.VideoType === "video_youtube" && (<div>
                                <VideoYoutubeUpload initialLink={course.VideoIntro} onChange={(value) => setCourse({ ...course, VideoIntro: value })} setDuration={(value) => setCourse({ ...course, TotalTimeDuration: value })} />
                            </div>)}



                            {course.VideoType === "video_mp4" && (<div className="flex flex-col gap-2">
                                <VideoMp4UploadFull initialLink={course.VideoIntro} onChange={(value) => setCourse({ ...course, VideoIntro: value })} setDuration={(value) => setCourse({ ...course, TotalTimeDuration: value })} />
                            </div>
                            )}

                            {course.VideoType === "pdf" && (
                                <div className="flex flex-col gap-2">
                                    <FileUploadPDF initialLink={course.VideoIntro} onChange={(value) => setCourse({ ...course, VideoIntro: value })} />
                                </div>
                            )}

                        </div>

                        <div className="flex justify-end">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={HandleSaveCourse}>
                                Lưu khoá học
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}