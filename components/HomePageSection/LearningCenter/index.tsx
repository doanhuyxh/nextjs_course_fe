"use client";

import Button from '@/components/Button';
import fetchData from "@/libs/configs/ApiConfig/fetchDataServer"
import Link from "next/link";
import { useEffect, useState } from 'react';


export default function LearningCenter() {

    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetchData("/course/GetAllCourse", "");
                if (response && response.data) {
                    setCourses(response.data);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <section className="w-full bg-[linear-gradient(159deg,#f9fafb_0%,#eff6ff_100%)] py-16 sm:py-20 md:py-24">
            <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-12 sm:gap-16">
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                            <span className="text-[#111827]">📚 Trung tâm Học Tập FlashBot – </span>
                            <span className="text-[#2563eb]">Video hướng dẫn từng bước</span>
                        </h2>
                        <p className="text-lg text-[#4b5563]">Nhấp vào từng bài học để xem và áp dụng ngay.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

                        {courses.map((course: any, index: number) => (
                            <div key={index} className="bg-white rounded-xl shadow-[0px_4px_6px_#00000019] overflow-hidden">
                                <div className="relative">
                                    <div className={`h-50 flex items-center justify-center relative`}
                                        style={{
                                            backgroundImage: `url(${course?.image || ""})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "cover",
                                        }}>
                                        <img src="/images_v2/img_.png" alt="" className="absolute top-4 right-4 w-6 h-4" />
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-[#22c55e] text-white text-xs font-bold px-3 py-1 rounded-[10px]">MỚI</span>
                                        </div>
                                        <div className="w-14 h-14 bg-[#ffffffe5] rounded-full flex items-center justify-center cursor-pointer">
                                            <img src="/images_v2/img_overlay.svg" alt="" className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="bg-[#dcfce7] text-[#15803d] text-xs px-2 py-1 rounded-xl">Người mới bắt đầu</span>
                                        <div className="flex items-center gap-1">
                                            <img src="/images_v2/img_svg_gray_600.svg" alt="" className="w-3 h-3" />
                                            <span className="text-xs text-[#6b7280]">{course?.totalTimeDuration || ""}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#111827] mb-4 leading-relaxed line-clamp-2">
                                        {course?.name || "Đang cập nhật"}
                                    </h3>
                                    <div className="text-sm text-[#4b5563] mb-6 leading-relaxed line-clamp-2 overflow-hidden"
                                        dangerouslySetInnerHTML={{ __html: course?.description || "" }} />
                                    <Link href={`/study/${course?.lesson[0]?.slug || ""}`}>
                                        <Button
                                            variant="gradient"
                                            size="md"
                                            className="w-full bg-[linear-gradient(90deg,#3b82f6_0%,#7c3aed_100%)] rounded-lg"
                                            leftImage={{
                                                src: "/images_v2/img_svg_white_a700_24x24.svg",
                                                width: 16,
                                                height: 16
                                            }}
                                        >
                                            Xem ngay
                                        </Button></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}