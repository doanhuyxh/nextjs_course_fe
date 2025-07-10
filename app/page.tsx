import type { Metadata } from 'next'
import fetchData from '@/libs/configs/fetchDataServer';
import '@/styles/home_khanh_hung.css'
import Header from '@/components/Header/CustomerKhanhHung';
import Footer from '@/components/Footer/Borntowrite';
import BannerReceive from '@/components/HomePageSection/KhanhHung/BannerReceive';
import CourseOutstanding from '@/components/HomePageSection/KhanhHung/CourseOutstanding';
import BannerFourth from "@/components/HomePageSection/Borntowrite/BannerFourth";
import CourseList from '@/components/HomePageSection/KhanhHung/CourseList';
import BannerFeatures from "@/components/HomePageSection/KhanhHung/BannerFeatures";
import TrackingSeo from '@/components/TrackingSeo';

const response = await fetchData('/public/seo', '');
console.log(response)
const data = JSON.parse(response.data);
export const metadata: Metadata = {
    title:data.title,
    description: data.description,
    keywords: data.keywords,
    openGraph: {
        type: 'website',
        url: data.url,
        title: data.title,
        description: data.description,
        images: [
            {
                url: data.logo,
                width: 800,
                height: 600,
                alt: data.title,
            },
        ],
    },
    twitter: {
        title: data.title,
        description: data.description,
        card: 'summary_large_image',
        images:[
            {
                url: data.logo,
                alt: data.title,
            }
        ]
    },
}

export default async function Home() {
    
    return (
        <>            
            <TrackingSeo/>
            <Header/>
            <main className="min-h-screen bg-[#580B94]">
                <BannerReceive/>
                <CourseOutstanding/>
                <CourseList/>
                <BannerFeatures/>
                <BannerFourth/>
            </main>

            <Footer/>
        </>
    );
}

