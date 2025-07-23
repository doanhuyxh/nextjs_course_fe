import React, { useRef, useState, useEffect } from "react";
import useLocalStorage from "@/libs/hooks/useLocalStorage";

export default function VideoMp4({ url, poster = "/default-thumbnail.jpg" }: { url: string; poster?: string; }) {

    const videoRef = useRef<HTMLVideoElement>(null);
    const [, setBufferedPercent] = useLocalStorage<number>("vt", 0);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleProgress = () => {
            if (!video.buffered.length) return;

            const bufferedEnd = video.buffered.end(video.buffered.length - 1);
            const duration = video.duration;
            const percent = (bufferedEnd / duration) * 100;

            setBufferedPercent(Math.floor(percent));
        };

        video.addEventListener("progress", handleProgress);

        return () => {
            video.removeEventListener("progress", handleProgress);
        };
    }, []);

    if (!url) {
        return (
            <div className="text-center text-gray-500">No video available</div>
        );
    }

    return (
        <div className="relative w-full h-full">
            <video
                className="w-full h-full"
                controls
                src={url}
                poster={poster}
                ref={videoRef}
            />
        </div>
    );
}
