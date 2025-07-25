"use client"

import { useState, useEffect, useCallback } from "react"
import {
    ChevronDown,
    ChevronRight,
    Lock,
    Play,
    Sparkles,
} from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import axiosCustomerConfig from "@/libs/configs/ApiConfig/axiosCustomerConfig"
import Link from "next/link"

import { useIsMobile } from "@/libs/hooks/use-mobile"
import useLocalStorage from "@/libs/hooks/useLocalStorage"
import {handleRedirectCustomer} from "@/libs/hooks/useRedirect"

export default function CoursePlaylist() {
    const [user, setUser] = useState<any>(null)
    const [isMounted, setIsMounted] = useState(false)
    const isMobile = useIsMobile()
    const [openSections, setOpenSections] = useState<Set<string>>(new Set())
    const [courseData, setCourseData] = useState<any[]>([])
    const [activeLesson, setActiveLesson] = useLocalStorage<string>("atl", "")

    const getAllCourse = useCallback(async () => {
        try {
            const response: any = await axiosCustomerConfig.get(
                `/course/GetAllCourse`
            )
            if (response.code !== 200) {
                console.error("Failed to fetch course data:", response.message)
                return
            }
            setCourseData(response.data || [])
        } catch (error) {
            console.error("Error fetching course data:", error)
        } finally {
            setIsMounted(true)
        }
    }, [])

    const getTagColors = (tag: string) => {
        switch (tag) {
            case "free":
                return "bg-[linear-gradient(90deg,#10B981_0%,#22C55E_100%)] text-white"
            case "basic":
                return "bg-[linear-gradient(90deg,#3B82F6_0%,#06B6D4_100%)] text-white"
            case "pro":
                return "bg-[linear-gradient(90deg,#6366F1_0%,#A855F7_100%)] text-white"
            case "premium":
                return "bg-[linear-gradient(90deg,#F59E0B_0%,#F97316_100%)] text-white"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getTagValue = (tag: string) => {
        switch (tag) {
            case "free":
                return "Free"
            case "basic":
                return "Basic"
            case "pro":
                return "Pro"
            case "premium":
                return "Premium"
            default:
                return "Unknown"
        }
    }

    const membershipLevels = ["free", "basic", "pro", "premium"]

    const isLocked = (lessonType: string) => {
        if (!user?.type) return true
        const userLevel = membershipLevels.indexOf(user.type)
        const lessonLevel = membershipLevels.indexOf(lessonType)
        return userLevel < lessonLevel
    }

    const toggleSection = (id: string) => {
        setOpenSections((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(id)) {
                newSet.delete(id)
            } else {
                newSet.add(id)
            }
            return newSet
        })
    }

    const isSectionOpen = (id: string) => openSections.has(id)

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        getAllCourse()
    }, [getAllCourse])

    useEffect(() => {
        if (activeLesson) {
            setActiveLesson(activeLesson)
            // mỏ hết tất cả các section
            courseData.forEach((section) => {
                toggleSection(section.id)
            })
        }
    }, [activeLesson, setActiveLesson, courseData])

    if (!isMounted) {
        return <div className="w-full !lg:min-w-[410px] rounded-2xl bg-white py-2 px-1 shadow-lg">
            <div className="flex items-center justify-center h-full">
                <Sparkles className="h-6 w-6 text-[#a855f7]" />
                <span className="text-lg font-bold text-[#0f172a]">Loading...</span>
            </div>
        </div>
    }

    return (
        <div className="w-full !lg:min-w-[410px] rounded-2xl bg-white py-2 px-1 shadow-lg">
            <div className="px-5 mb-6 mt-2 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-[#a855f7]" />
                <h1 className="lg:text-2xl text-[19px] font-bold text-[#0f172a]">Course Playlist</h1>
            </div>

            <div className="space-y-4 max-h-[100%] overflow-y-auto">
                {courseData.map((section) => (
                    <Collapsible
                        key={section.id}
                        open={isSectionOpen(section.id)}
                        onOpenChange={() => toggleSection(section.id)}
                        className={`rounded-xl transition-all py-2 duration-300 ${isSectionOpen(section.id)
                            ? "bg-[#ecfdf5] border-l-4 border-[#a7f3d0]"
                            : "bg-white border border-[#e5e7eb]"
                            }`}
                    >
                        <CollapsibleTrigger className="flex w-full items-center justify-between">
                            <div className="flex items-start gap-2">
                                <div className="flex items-center justify-center h-10 w-10">
                                    {isSectionOpen(section.id) ? (
                                        <ChevronDown className="h-5 w-5 text-[#6b7280]" />
                                    ) : (
                                        <ChevronRight className="h-5 w-6 text-[#6b7280]" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm text-[#6b7280] text-left">
                                        ({section.numberOfLessons || 0} videos)
                                    </p>
                                    <h2 className="text-[#0f172a] font-[700] line-clamp-2 text-left mr-2">
                                        {section.name}
                                    </h2>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Progress
                                            value={
                                                section.progress && section.numberOfLessons
                                                    ? (section.progress /
                                                        section.numberOfLessons) *
                                                    100
                                                    : 0
                                            }
                                            className="h-1.5 w-24 [&::-webkit-progress-bar]:bg-[#e5e7eb] [&::-webkit-progress-value]:bg-[#a7f3d0]"
                                        />
                                        <span className="text-sm text-[#6b7280]">
                                            {section.progress || 0}/{section.numberOfLessons || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-4">
                            <div className="space-y-3">
                                {section.lesson && section.lesson.length > 0 ? (
                                    section.lesson.map((item: any) => {
                                        const locked = isLocked(item.memberType)
                                        return (
                                            <Link href={`${activeLesson === item.id ? "#" : `/study/${item.slug}`}`}
                                                key={item.id}
                                                onClick={() => {
                                                    setActiveLesson(item.id)
                                                }}
                                                className={`flex items-center gap-3 rounded-lg p-3 shadow-sm border border-[#FDE68A] cursor-pointer`}
                                            >
                                                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-[#94a3b8]">
                                                    <img
                                                        src={
                                                            item.imageThumbnail ||
                                                            "/placeholder.svg"
                                                        }
                                                        alt="Thumbnail"
                                                        className="h-full w-full object-cover"
                                                    />
                                                    {
                                                        activeLesson != item.id && (
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                                <Play className="h-6 w-6 text-white" />
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        activeLesson === item.id && (
                                                            <div className="absolute top-[0] left-0 bg-black w-full h-full flex items-center justify-center bg-opacity-40">
                                                                <span className="text-white text-xs">
                                                                    Đang xem
                                                                </span>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                <div className="flex flex-col justify-between flex-grow gap-2 mb-2">
                                                    <h3 className="lg:text-base text-[14px] font-medium text-[#0f172a] lg:line-clamp-2 line-clamp-1">
                                                        {item.name || "Không có tiêu đề"}
                                                    </h3>
                                                    <div className="flex items-center justify-between text-sm text-[#6b7280]">
                                                        <div className="flex items-center gap-1 flex-wrap">
                                                            <span className="text-[10px]">{item.duration || "0:00"}</span>
                                                            <span className="rounded-full px-2 py-0.5 text-[10px] lg:text-[11px] font-normal bg-[#DCFCE7] text-[#16A34A]">
                                                                Người mới bắt đầu
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span
                                                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${getTagColors(item.memberType)}`}
                                                            >
                                                                {getTagValue(item.memberType)}
                                                            </span>
                                                            {locked && (
                                                                <Lock className="h-4 w-4 text-[#6b7280]" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                ) : (
                                    <p className="text-sm text-gray-500 italic">
                                        Chưa có bài học nào trong phần này.
                                    </p>
                                )}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>
            {courseData.length === 0 && (
                <div className="text-center text-sm text-gray-500 mt-4">
                    Không có khóa học nào hiện có.
                </div>
            )}

            {isMobile && (
                <div className="fixed bottom-4 left-4 right-4 z-50">
                    <a onClick={() => handleRedirectCustomer(user?.id, "plans")}
                        className="h-[56px] w-full bg-gradient-to-r from-[#2563EB] to-[#9333EA] text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
                    >
                        Nâng cấp ngay
                    </a>
                </div>
            )}

        </div>
    )
}
