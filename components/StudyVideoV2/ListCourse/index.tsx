import { useState, useRef, useEffect } from "react"
import { ChevronDown, Play, Clock, Video, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { CourseData } from "@/libs/types"
import useLocalStorage from "@/libs/hooks/useLocalStorage"
import { useRouter } from "next/navigation"


export default function ListCourse({ coursesData, containerRef }: { coursesData: CourseData[]; containerRef: React.RefObject<HTMLDivElement> }) {
    const [expandedCourses, setExpandedCourses] = useState<string[]>([])
    const [contentHeight, setContentHeight] = useState<number>(0)
    const [toggleCourse] = useLocalStorage<string>("toggleCourse", "")
    const [activeLesson, setActiveLesson] = useLocalStorage<string>("ActiveLesson", "")
    const router = useRouter()

    const handleToggleCourse = (courseId: string) => {
        setExpandedCourses((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]))
    }

    const handleRedirectToLesson = (lessonSlug: string, lessonId: string) => {
        setActiveLesson(lessonId)
        router.push(`/study/${lessonSlug}`)
    }

    useEffect(() => {
        if (toggleCourse) {
            handleToggleCourse(toggleCourse);
        }
    }, [toggleCourse])

    useEffect(() => {
        const handleResize = () => {
            const newHeight = window.innerHeight - (containerRef.current?.getBoundingClientRect().top || 0) - 20; // Adjust for padding
            setContentHeight(newHeight)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="w-full mx-auto px-2 py-1 space-y-6" ref={containerRef}>
            <div className="overflow-y-auto" style={{ maxHeight: contentHeight }}>
                {coursesData.map((course) => {
                    const isExpanded = expandedCourses.includes(course.id)
                    const hasLessons = course.lesson.length > 0
                    return (
                        <Card
                            key={course.id}
                            className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm mb-1"
                        >
                            <CardContent className="p-0">
                                <div
                                    className={`relative cursor-pointer transition-all duration-300 ${isExpanded
                                        ? "bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600"
                                        : "bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-500 hover:from-purple-600 hover:via-purple-700 hover:to-indigo-600"
                                        }`}
                                    onClick={() => handleToggleCourse(course.id)}
                                >
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.1%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
                                    </div>

                                    <div className="relative p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 pr-4">

                                                <h3 className="font-bold text-lg leading-tight mb-4 text-white group-hover:text-yellow-100 transition-colors">
                                                    {course.name}
                                                </h3>

                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div className="flex items-center gap-2 text-white/90">
                                                        <div className="p-1.5 bg-white/20 rounded-lg">
                                                            <Video className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{course.numberOfLessons}</div>
                                                            <div className="text-xs opacity-75">Video bài học</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-white/90">
                                                        <div className="p-1.5 bg-white/20 rounded-lg">
                                                            <Clock className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{course.totalTimeDuration || "N/A"}</div>
                                                            <div className="text-xs opacity-75">Tổng thời lượng</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center gap-2">
                                                <div
                                                    className={`p-3 rounded-full bg-white/20 transition-all duration-300 ${isExpanded ? "rotate-180 bg-white/30" : "group-hover:bg-white/30"
                                                        }`}
                                                >
                                                    <ChevronDown className="w-6 h-6 text-white" />
                                                </div>
                                                {hasLessons && (
                                                    <div className="text-xs text-white/75 text-center">{isExpanded ? "Thu gọn" : "Mở rộng"}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {isExpanded && hasLessons && (
                                    <div className="bg-gradient-to-b from-white to-gray-50">
                                        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                                            {course.lesson.map((lesson, index) => (
                                                <div
                                                    onClick={() => handleRedirectToLesson(lesson.slug, lesson.id)}
                                                    key={lesson.id}
                                                    className={`group/lesson flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-300 ${lesson.id === activeLesson ? "bg-gradient-to-r from-blue-500 to-purple-50" : ""}`}
                                                >
                                                    {/* Lesson Thumbnail */}
                                                    <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0 shadow-md group-hover/lesson:shadow-lg transition-shadow">
                                                        <Image
                                                            src={lesson.imageThumbnail || "/placeholder.svg?height=56&width=80"}
                                                            alt={lesson.name}
                                                            fill
                                                            className="object-cover group-hover/lesson:scale-105 transition-transform duration-300"
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 group-hover/lesson:bg-black/30 transition-colors flex items-center justify-center">
                                                            <div className="p-2 bg-white/90 rounded-full group-hover/lesson:bg-white group-hover/lesson:scale-110 transition-all duration-300">
                                                                <Play className="w-4 h-4 text-purple-600 ml-0.5" />
                                                            </div>
                                                        </div>

                                                        <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                                                            {String(index + 1).padStart(2, "0")}
                                                        </div>
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight mb-2 group-hover/lesson:text-purple-700 transition-colors">
                                                            {lesson.name}
                                                        </h4>
                                                        <div className="flex items-center gap-2">
                                                            {lesson.isFree && (
                                                                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xs px-3 py-1 shadow-sm">
                                                                    <span className="font-medium">FREE</span>
                                                                </Badge>
                                                            )}
                                                            {lesson.isImportant && (
                                                                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1">
                                                                    Quan trọng
                                                                </Badge>
                                                            )}
                                                            {lesson.isOutstanding && (
                                                                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-3 py-1">
                                                                    Nổi bật
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Duration */}
                                                    <div className="flex flex-col items-end gap-1">
                                                        <div className="flex items-center gap-1 text-purple-600 font-semibold text-sm bg-purple-50 px-3 py-1.5 rounded-lg">
                                                            <Clock className="w-3 h-3" />
                                                            <span>{lesson.duration}</span>
                                                        </div>
                                                        <div className="text-xs text-gray-500">Bài {index + 1}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {isExpanded && !hasLessons && (
                                    <div className="bg-gray-50 p-8 text-center">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <BookOpen className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <h4 className="text-gray-600 font-medium mb-2">Chưa có bài học</h4>
                                        <p className="text-gray-500 text-sm">Khóa học này đang được cập nhật nội dung</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
