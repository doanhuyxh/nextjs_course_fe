"use client"

import Image from "next/image"
import { ChevronDown, ChevronRight, Lock, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import axiosCustomerConfig_v2 from "@/libs/configs/ApiConfig/axiosCustomerConfigV2"
import useLocalStorage from "@/libs/hooks/useLocalStorage"
import Link from "next/link"

const sectionConfig = {
    free: {
        label: "Free",
        bgColor: "bg-[#eff6ff]",
        progressColor: "bg-[#bfdbfe]",
        tagColor: "bg-[#1d4ed8]",
        locked: false,
    },
    basic: {
        label: "Basic",
        bgColor: "bg-white",
        progressColor: "bg-gray-200",
        tagColor: "bg-[linear-gradient(90deg,#3B82F6_0%,#06B6D4_100%)]",
        locked: true,
    },
    pro: {
        label: "Pro",
        bgColor: "bg-white",
        progressColor: "bg-gray-200",
        tagColor: "bg-[linear-gradient(90deg,#6366F1_0%,#A855F7_100%)]",
        locked: true,
    },
    premium: {
        label: "Premium",
        bgColor: "bg-white",
        progressColor: "bg-gray-200",
        tagColor: "bg-[linear-gradient(90deg,#F59E0B_0%,#F97316_100%)]",
        locked: true,
    },
}

export default function CourseSection() {
    const [coursesByType, setCoursesByType] = useState({
        free: [],
        basic: [],
        pro: [],
        premium: [],
    })

    const [openSection, setOpenSection] = useState({
        free: true,
        basic: false,
        pro: false,
        premium: false,
    })

    const [activeLesson] = useLocalStorage<string>("ActiveLesson", "");

    const toggleSection = (type: string) => {
        setOpenSection(prev => ({ ...prev, [type]: !prev[type] }))
    }

    const fetchCourse = async () => {
        const response = await axiosCustomerConfig_v2.get('/course/all?skip=0&take=100')
        const courses = response.data

        setCoursesByType({
            free: courses.filter(course => course.memberType === 'free'),
            basic: courses.filter(course => course.memberType === 'basic'),
            pro: courses.filter(course => course.memberType === 'pro'),
            premium: courses.filter(course => course.memberType === 'premium'),
        })
    }

    useEffect(() => {
        fetchCourse()
    }, [])

    return (
        <Card className="bg-white rounded-lg shadow-md p-6 col-span-1 lg:col-span-1">
            <CardHeader className="p-0 pb-4 flex flex-row items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#7e22ce]" />
                <CardTitle className="text-lg font-bold text-[#111827]">Course Playlist</CardTitle>
            </CardHeader>

            <CardContent className="p-0 grid gap-4">
                {Object.entries(sectionConfig).map(([key, config]) => (
                    <div
                        key={key}
                        className={`${config.bgColor} rounded-lg p-4 border ${key === 'free' ? '' : 'border-[#e2e8f0]'}`}
                    >
                        <div
                            className="flex items-center justify-between text-sm font-medium cursor-pointer"
                            onClick={() => toggleSection(key)}
                        >
                            <div className="flex items-center gap-2 text-[#4b5563]">
                                {openSection[key] ? (
                                    <ChevronDown className="w-4 h-4" />
                                ) : (
                                    <ChevronRight className="w-4 h-4" />
                                )}
                                <span className={`${config.tagColor} text-white px-2 py-1 rounded-full`}>
                                    {config.label}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                                {config.locked && <Lock className="w-4 h-4" />}
                                <span>{coursesByType[key].length} khóa học</span>
                            </div>
                        </div>

                        <Progress value={33} className={`w-full h-2 mt-2 ${config.progressColor}`} />
                        <div className="text-xs text-[#6b7280] mt-1">1/3</div>

                        {openSection[key] && (
                            <div className="mt-4 grid gap-3">
                                {coursesByType[key].map((course: any, index: number) => (
                                    <Link href={`/study_v3/${course.slug}`} className={`flex items-center gap-3 ${activeLesson == course.id ? '' :'bg-red-500'}`} key={index}>
                                        <Image
                                            src={course.image || "/images/default-thumbnail.png"}
                                            width={80}
                                            height={48}
                                            alt="Lesson Thumbnail"
                                            className="rounded-md object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-[#111827]">
                                                {course.name}
                                            </h3>
                                            <p className="text-xs text-[#6b7280]">
                                                {course.totalTimeDuration}{" "}
                                                <span className="text-[#15803d]">Người mới bắt đầu</span>
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
