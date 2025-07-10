'use client'

import Image from "next/image";
import ScrollComponent from "../../../Scroll/ScrollComponent";
import CourseItem from "./CourseListItem";
import {useEffect, useState, useRef} from "react";
import axiosCustomerConfig from "@/libs/configs/axiosCustomerConfig";
import {CourseData} from "@/libs/types";

const CourseList = () => {
    const preOverlayRef = useRef<HTMLDivElement>(null);
    const [coursesData, setCoursesData] = useState<CourseData[]>([])

    const checkNextIndex = (index: number) => {
        return !!coursesData[index + 1];
    }


    useEffect(() => {

        if(preOverlayRef.current){
            const checkClassHeight = preOverlayRef.current.clientHeight;
            preOverlayRef.current.style.transform = `translateY(-${checkClassHeight}px)`;
        }

        axiosCustomerConfig.get("/course/GetAllCourse")
            .then(res => {
                setCoursesData(res.data)
            })
    }, [])

    return (
        <div id='chuong-trinh-hoc' className="bg-[#440873] pt-10 pb-30 hidden lg:block ">
            <div className="transforn w-full h-52 bg-[#440873] rounded-t-[100px] top-0 left-0" ref={preOverlayRef}></div>
            <div className='w-full max-w-[1920px] m-auto px-4 flex flex-col items-center justify-center gap-20'>
                <div className='w-full text-center'>
                    <h2 className='text-4xl md:text-5xl font-bold text-white inline-flex justify-center items-center gap-4 flex-wrap'>
                        KHÓA HỌC NÀY
                        <div
                            className='flex gap-2 lg:gap-10 items-center justify-center bg-white rounded-xl px-4 py-5 lg:min-w-[500px] item_spin_radius overflow-hidden'>
                            <span className='text-pink-500 lg:text-3xl'>đã bao gồm</span>
                            <span className='text-pink-500  text-[6rem] font-bold'>213</span>
                            <span className='text-pink-500 lg:text-3xl'>bài học</span>
                            <span className='inline-block ml-2'>
                <Image
                    src="/assets/images/ic-gal-vid.png"
                    width={40}
                    height={40}
                    alt="play icon"
                />
              </span>
                        </div>
                    </h2>
                </div>

                <div className='w-full lg:w-10/12 m-auto'>
                    <ScrollComponent direction='horizontal' className='flex'>
                        {coursesData && coursesData.map((item, index) => (
                            <div key={index} className="flex gap-4">
                                <div
                                    className="lg:max-w-[600px] min-h-[600px] lg:min-w-[600px] bg-[#69398F] p-[20px] rounded-[25.6px] mx-[20px]">
                                    <div className="mb-[24px]">
                                        <h2 className="text-4xl font-bold text-white mb-[12px] line-clamp-2 leading-relaxed">
                                            {item.name}
                                        </h2>
                                        <p className="inline-block text-[#d1d5db] text-[20px] px-[12px] py-[8px] bg-black/20 rounded-lg">
                                            Số lượng bài: {item.numberOfLessons} bài | Thời
                                            lượng: {item.totalTimeDuration}
                                        </p>
                                    </div>
                                    <div
                                        className="space-y-[16px] overflow-y-auto pr-[8px] max-h-[calc(600px-50px)] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/40 scrollbar-thumb-rounded-full">
                                        {item.lesson && item.lesson.map((lesson, index) => (
                                            <CourseItem key={index} lesson={lesson}/>
                                        ))}
                                    </div>
                                </div>
                                {
                                    checkNextIndex(index) && (
                                        <div className="flex items-center justify-center w-20 h-full">
                                            <Image
                                                src="/template/assets/images/home/arrow-right.png"
                                                width={40}
                                                height={40}
                                                alt="arrow right"
                                                className="animate-fade-right animate-infinite animate-ease-linear"
                                            />
                                        </div>
                                    )
                                }

                            </div>
                        ))}
                    </ScrollComponent>

                </div>
            </div>
        </div>

    );
};

export default CourseList; 