'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoBunny({ url }: { url: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!url || !videoRef.current) return;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(videoRef.current);

            return () => {
                hls.destroy();
            };
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = url;
        }
    }, [url]);

    return (
        <video
            ref={videoRef}
            className="w-full h-full"
            controls
            poster="/default-thumbnail.jpg"
            playsInline
        />
    );
}
