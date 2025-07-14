import type { Metadata } from 'next'
import { cookies } from "next/headers";
import '@/styles/home_khanh_hung.css'
import fetchDataServer from "@/libs/configs/ApiConfig/fetchDataServer";
import { redirect } from 'next/navigation';
import LessonList from "@/components/Lesson/LessonList/LessonList";
import FormAuth from "@/components/HomePageSection/AuthTabs";

export const metadata: Metadata = {
    title: 'Hứng dẫn sử dụng bot',
    description: 'Hứng dẫn sử dụng bot nâng cao của Study Flash AI',
}

export default async function StudyPage() {
    const cookie = await cookies()
    const accToken = cookie.get('AccessToken')
    const isLogin = accToken ? true : false

    if (isLogin) {
        const res = await fetchDataServer('/course/get-last-lesson', accToken?.value || '');
        if (res.code === 200) {
            redirect(`/study/${res.data}`);

        } else {
            redirect('/');
        }
    }

    return (
        <div className=" max-w-[2100px] m-auto flex flex-col lg:flex-row justify-center items-center gap-20 mt-10 lg:mt-20">
            <div className="">
                <FormAuth />
            </div>
            <div className="video_list lg:w-1/3 w-full max-w-[600px]">
                <LessonList />
            </div>
        </div>
    );


}