
import dynamic from "next/dynamic";
import TrackingSeo from "@/components/TrackingSeo";
const Header = dynamic(() => import("@/components/Header/CustomerKhanhHung"));
import "@/styles/study.css";

export default async function LearnLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
    <TrackingSeo/>
      <Header/>
      <div className="w-full min-h-[70vh] h-screen overflow-x-auto">
        {children}
      </div>
    </>
  );
}
