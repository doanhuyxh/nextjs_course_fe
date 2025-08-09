"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Copy, LogOut, Zap } from "lucide-react"
import { Drawer } from "antd"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import  {Button}  from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useToast } from "@/libs/hooks/use-toast"

const axiosCustomerConfig = {
  get: async (url: string) => {
    if (url === "/course/get-last-lesson") {
      return { code: 200, data: "lesson-id-123" }
    }
    return { code: 404, message: "Not found" }
  },
}

type Customer = {
  firstName: string
  lastName: string
  email: string
  code: string
}

const AppSidebar = () => {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const { toast } = useToast()
  const [user, setUser] = useState<Customer | null>(null)
  const { isMobile, openMobile, closeMobileSidebar } = useSidebar()

  const [menu] = useState([
    {
      title: "Profile",
      items: [
        { label: "Dashboard", link: "/learn/dashboard", icon: "/assets/images/mb-ic-1.svg" },
        { label: "Đổi mật khẩu", link: "/learn/change-password", icon: "/assets/images/mb-ic-2.svg" },
        { label: "Profile C1", link: "/learn/profile", icon: "/assets/images/mb-ic-3.svg" },
        { label: "Thông báo của bạn", link: "/learn/notification", icon: "/assets/images/ic-histories-email.svg" },
      ],
    },
    {
      title: "Về khoá học",
      items: [
        { label: "Chương trình học", link: "/#chuong-trinh-hoc", icon: "/assets/images/ic-chanel-4-side-menu.svg" },
        { label: "Quyền lợi", link: "/#quyen-loi", icon: "/assets/images/ic-chanel-5.svg" },
        {
          label: "Thông tin về chúng tôi",
          link: "/#thong-tin-ve-chung-toi",
          icon: "/assets/images/ic-chanel-3-side-menu.svg",
        },
      ],
    },
  ])

  const handleLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    document.cookie = ""
    router.push("/")
  }

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${label} đã được sao chép`,
    })
  }

  const handleChangeStudyPage = async () => {
    try {
      const response: any = await axiosCustomerConfig.get("/course/get-last-lesson")
      if (response.code === 200) {
        router.push(`/study/${response.data}`)
      } else {
        toast({
          title: "Error",
          description: "Không thể lấy bài học cuối cùng.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Có lỗi xảy ra khi lấy bài học.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    const userData = sessionStorage.getItem("user")
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch {
        setUser(null)
      }
    }
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="size-16 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="space-y-4 mb-6">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex-1 overflow-auto space-y-4">
            {Array.from({ length: 2 }).map((_, groupIndex) => (
              <div key={groupIndex} className="mb-4">
                <Skeleton className="h-5 w-24 mb-2" />
                <div className="space-y-1">
                  {Array.from({ length: 4 }).map((_, itemIndex) => (
                    <Skeleton key={itemIndex} className="h-8 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SidebarContent>
        <SidebarFooter>
          <Skeleton className="h-10 w-full" />
        </SidebarFooter>
      </Sidebar>
    )
  }

  const desktopSidebar = (
    <Sidebar collapsible="icon" className="px-4 shadow-lg">
      <SidebarHeader>
        {user && (
          <div className="flex items-center gap-4 mb-6">
            <Link href="/learn/profile" className="flex-shrink-0">
              <Avatar className="size-16">
                <AvatarImage src="/assets/images/avatar_defaut.jpg" alt="User Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-col overflow-hidden">
              <span className="text-lg font-semibold truncate">{user.firstName + " " + user.lastName}</span>
              <span className="text-gray-500 text-sm truncate">{user.email}</span>
            </div>
          </div>
        )}
        {user && (
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Mã khách hàng</p>
                <p className="font-semibold text-primary">{user.code}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopy(user.code, "Mã khách hàng")}
                aria-label="Copy customer code"
              >
                <Copy className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <Button
          onClick={handleChangeStudyPage}
          className="mb-6 w-full text-lg py-5 bg-pink-500 !text-white hover:!bg-pink-600 transition-colors"
        >
          <Zap className="mr-2 size-5" />
          Học ngay
        </Button>
        <div className="flex-1 overflow-auto">
          {menu.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.label} className="font-bold">
                      <SidebarMenuButton asChild tooltip={item.label}>
                        <Link href={item.link} className="flex items-center gap-2">
                          <Image src={item.icon || "/placeholder.svg"} alt="" width={20} height={20} />
                          <span className="truncate font-semibold">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter className="!border-red-500">
        {user && (
          <>
            <Separator className="my-2" />
            <Button
              variant="ghost"
              className="w-full justify-start text-left text-red-500 hover:text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 size-4" />
              Đăng xuất
            </Button>
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  )

  const mobileSidebar = (
    <Drawer
      open={openMobile}
      onClose={closeMobileSidebar}
      placement="left"
      width={300}
    >
      {desktopSidebar} 
    </Drawer>
  )
  return isMobile ? mobileSidebar : desktopSidebar
}

export default AppSidebar
