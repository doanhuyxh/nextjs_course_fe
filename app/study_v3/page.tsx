import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Bell,
  Facebook,
  LifeBuoy,
  Crown,
  User,
  Play,
  Check,
  FileText,
  HelpCircle,
  Users,
  Search,
  Filter,
  ChevronDown,
  Lock,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import HeaderStudyVideoV3 from "@/components/StudyVideoV3/heder"
import VideoSectionV3 from "@/components/StudyVideoV3/videoSection"
import CourseSection from "@/components/StudyVideoV3/courseSection"

export default function Component() {
  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      {/* Top Navigation Bar */}
    <HeaderStudyVideoV3 />

      {/* Main Content Area */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr_0.8fr] gap-6">
        {/* Video Player Section */}
        <VideoSectionV3 />
        {/* Course Playlist Section */}
        <CourseSection />
        {/* Right Sidebar */}
       
      </main>
    </div>
  )
}
