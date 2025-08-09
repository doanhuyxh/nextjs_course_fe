import  {Button}  from "@/components/ui/button";
import { Search, Filter, Lock, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"


export default function FilterSidebarSection() {
    return (
        <aside className="bg-white rounded-lg shadow-md p-6 col-span-1">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full pl-9 pr-4 py-2 rounded-full border border-[#e2e8f0] focus:ring-[#3b82f6] focus:border-[#3b82f6] text-[#111827]"
                />
            </div>

            <div className="mt-6">
                <div className="flex items-center justify-between text-lg font-bold text-[#111827] mb-4">
                    Bộ lọc
                    <Filter className="w-5 h-5 text-[#6b7280]" />
                </div>
                <div className="grid gap-4">
                    <div>
                        <label htmlFor="topic" className="block text-sm font-medium text-[#475569] mb-2">
                            Đề tài
                        </label>
                        <div className="relative">
                            <select
                                id="topic"
                                className="block w-full appearance-none rounded-md border border-[#e2e8f0] bg-white py-2 pl-3 pr-10 text-[#111827] focus:border-[#3b82f6] focus:ring-[#3b82f6] sm:text-sm"
                            >
                                <option>Tất cả các chủ đề</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="difficulty" className="block text-sm font-medium text-[#475569] mb-2">
                            Khó khăn
                        </label>
                        <div className="relative">
                            <select
                                id="difficulty"
                                className="block w-full appearance-none rounded-md border border-[#e2e8f0] bg-white py-2 pl-3 pr-10 text-[#111827] focus:border-[#3b82f6] focus:ring-[#3b82f6] sm:text-sm"
                            >
                                <option>Tất cả các cấp độ</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-gradient-to-br from-[#a855f7] to-[#7e22ce] rounded-lg p-6 text-white shadow-lg">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                    Mở khóa thêm nội dung
                    <Lock className="w-4 h-4" />
                </h3>
                <p className="text-sm leading-relaxed opacity-90">
                    Nâng cấp để truy cập các bài học nâng cao và nội dung độc quyền.
                </p>
                <Button className="mt-4 w-full bg-white text-[#7e22ce] hover:bg-gray-100 rounded-full px-4 py-2 text-sm font-medium">
                    Nâng cấp ngay
                </Button>
            </div>
        </aside>
    )
}
