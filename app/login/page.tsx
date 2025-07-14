import AuthTabs from "@/components/HomePageSection/AuthTabs";

export default function LoginPage() {
    return (
        <div className="bg-[linear-gradient(173deg,#3b82f6_0%,#4f46e5_50%,#6d28d9_100%)] w-full h-screen m-auto flex justify-center items-center">
            <div className="bg-transparent mt-20 lg:mt-0">
                <AuthTabs />
            </div>
        </div>
    );
}