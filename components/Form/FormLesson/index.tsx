import FileUploadPDF from "@/components/FileHandle/FileUploadPDF";
import VideoMp4UploadFull from "@/components/FileHandle/VideoMp4";
import EditorReactQuill from "../../Editor/ReactQuill";
import { LessonItem, MemberType } from "@/libs/types";
import { generateSlug } from "@/libs/utils/index";
import { useState } from "react";
import FileUploadImage from "../../FileHandle/FileUploadImage";
import VideoM3U8 from "@/components/FileHandle/VideoM3U8";
import VideoYoutubeUpload from "@/components/FileHandle/VideoYoutube";
import VideoIframeUpload from "@/components/FileHandle/VideoIframe";


export default function FormLesson({ lesson, setLesson, saveLesson }: { lesson: LessonItem, setLesson: any, saveLesson: any }) {

    const [lessonTemp, setLessonTemp] = useState<LessonItem>({ ...lesson })

    const SaveLesson = () => {
        if (JSON.stringify(lesson) !== JSON.stringify(lessonTemp)) {
            saveLesson({ ...lessonTemp });
        } else {
            console.log("Nothing change");
        }
    };


    const handleEditorChangeLessonContent = (content: string) => {
        setLessonTemp({ ...lessonTemp, lessonContent: content });
    };

    const handleCheckboxChange = (field: string, value: boolean) => {
        setLessonTemp({ ...lessonTemp, [field]: value });
    };

    const hanleTypeVideoChange = (type: string) => {
        setLessonTemp({ ...lessonTemp, type: type, video: '', duration: '00:00' });
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setLessonTemp({ ...lessonTemp, name: newName, slug: generateSlug(newName) });
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLessonTemp({ ...lessonTemp, slug: e.target.value });
    };

    return (
        <div className="flex flex-col gap-4">

            <div className="flex flex-col">
                <div className="font-bold opacity-65 flex gap-2">
                    Thumbnail (<strong className="text-red-900 font-[400]">1090 * 620</strong>)
                    <label className="bg-green-400 px-2 rounded-lg cursor-pointer" htmlFor="fileUpload_2">
                        <i className="fa fa-upload" />
                    </label>
                </div>
                <FileUploadImage index={2} onChange={(newValue: any) => {
                    setLessonTemp({ ...lessonTemp, imageThumbnail: newValue })
                }} value={lessonTemp.imageThumbnail} />
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-semibold">Tên bài học</label>
                <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    placeholder="Nhập tên bài học"
                    value={lessonTemp.name}
                    onChange={handleNameChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-semibold">Slug (phục vụ seo)</label>
                <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    placeholder="tên bài học, tự động tạo khi nhập tên bài học"
                    value={lessonTemp.slug}
                    onChange={handleSlugChange}
                />
            </div>

            <div className="flex flex-row justify-evenly gap-5 items-center">

                <div className="flex flex-row items-center gap-3">
                    <label className="font-semibold">Loại bài học</label>
                    <div className="flex flex-row gap-2">
                        <label className="cursor-pointer">Video YouTube <input type="radio" value={"video_youtube"} checked={lessonTemp.type === "video_youtube"} onChange={(e) => hanleTypeVideoChange(e.target.value)} /></label>
                        <label className="cursor-pointer">Video MP4 <input type="radio" value={"video_mp4"} checked={lessonTemp.type === "video_mp4"} onChange={(e) => hanleTypeVideoChange(e.target.value)} /></label>
                        <label className="cursor-pointer">Video M3u8 <input type="radio" value={"video_m3u8"} checked={lessonTemp.type === "video_m3u8"} onChange={(e) => hanleTypeVideoChange(e.target.value)} /></label>
                        <label className="cursor-pointer">Video Iframe <input type="radio" value={"video_iframe"} checked={lessonTemp.type === "video_iframe"} onChange={(e) => hanleTypeVideoChange(e.target.value)} /></label>
                        <label className="cursor-pointer">PDF <input type="radio" value={"pdf"} checked={lessonTemp.type === "pdf"} onChange={(e) => hanleTypeVideoChange(e.target.value)} /></label>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <label className="font-semibold">Thời lượng</label>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2"
                        placeholder="Nhập thời lượng bài học"
                        value={lessonTemp.duration}
                        onChange={(e) => setLessonTemp({ ...lessonTemp, duration: e.target.value })}
                    />
                </div>

                <div className="flex flex-row justify-between gap-4 items-center">
                    <div className="flex gap-2 items-center  cursor-pointer">
                        <label className="font-semibold">Loại thành viên </label>
                        <select className="border border-gray-300 rounded-md p-2" value={lessonTemp.memberType} onChange={(e) => setLessonTemp({ ...lessonTemp, memberType: e.target.value })}>
                            {MemberType.map((item) => (
                                <option key={item.value} value={item.value.trim()}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2 items-center  cursor-pointer">
                        <input
                            id="isOutstanding"
                            type="checkbox"
                            checked={lessonTemp.isOutstanding}
                            onChange={(e) => handleCheckboxChange('isOutstanding', e.target.checked)}
                        />
                        <label htmlFor="isOutstanding" className="cursor-pointer">Nổi bật</label>
                    </div>

                    <div className="flex gap-2 items-center cursor-pointer">
                        <input
                            id="isImportant"
                            type="checkbox"
                            checked={lessonTemp.isImportant}
                            onChange={(e) => handleCheckboxChange('isImportant', e.target.checked)}
                        />
                        <label htmlFor="isImportant" className="cursor-pointer">Quan trọng</label>
                    </div>
                </div>

            </div>

            {lessonTemp.type === "video_m3u8" && (<div>
                <VideoM3U8 initialLink={lessonTemp.video} onChange={(value) => setLessonTemp({ ...lessonTemp, video: value })} setDuration={(value) => setLessonTemp({ ...lessonTemp, duration: value })} />
            </div>)}


            {lessonTemp.type === "video_youtube" && (<div>
                <VideoYoutubeUpload initialLink={lessonTemp.video} onChange={(value) => setLessonTemp({ ...lessonTemp, video: value })} setDuration={(value) => setLessonTemp({ ...lessonTemp, duration: value })} />
            </div>)}

            {lessonTemp.type === "video_mp4" && (<div className="flex flex-col gap-2">
                <VideoMp4UploadFull initialLink={lessonTemp.video} onChange={(value) => setLessonTemp({ ...lessonTemp, video: value })} setDuration={(value) => setLessonTemp({ ...lessonTemp, duration: value })} />
            </div>
            )}

            {lessonTemp.type === "pdf" && (
                <div className="flex flex-col gap-2">
                    <FileUploadPDF initialLink={lessonTemp.video} onChange={(value) => setLessonTemp({ ...lessonTemp, video: value })} />
                </div>
            )}

            {lessonTemp.type === "video_iframe" && (<div>
                <VideoIframeUpload initialLink={lessonTemp.video} onChange={(value) => setLessonTemp({ ...lessonTemp, video: value })} setDuration={(value) => setLessonTemp({ ...lessonTemp, duration: value })} />
            </div>)}

            <div className="flex flex-col gap-2">
                <label className="font-semibold">Nội dung bài học</label>
                <EditorReactQuill value={lessonTemp.lessonContent} onChange={handleEditorChangeLessonContent} />
            </div>

            <div className="flex justify-end mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={SaveLesson}>
                    Lưu bài học
                </button>
            </div>
        </div>
    )
}