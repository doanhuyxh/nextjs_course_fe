'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export default function VideoBunny({ url }: { url: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!url || !videoRef.current) return;

        const video = videoRef.current;

        const handleCanPlay = () => setLoading(false);
        const handleWaiting = () => setLoading(true);
        const handlePlaying = () => setLoading(false);

        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('playing', handlePlaying);

        let hls: Hls | null = null;

        if (Hls.isSupported()) {
            hls = new Hls({
                // Chỉ định rằng ta muốn ưu tiên chất lượng cao nhất
                startLevel: -1, // mặc định
                maxMaxBufferLength: 60,
            });

            hls.loadSource(url);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                // Chọn chất lượng cao nhất có thể (độ phân giải cao nhất)
                const levels = hls?.levels;
                if (levels && levels.length > 0) {
                    const maxLevelIndex = levels.length - 1;
                    if (hls) {
                        hls.currentLevel = maxLevelIndex;
                    }
                }

                video.play().catch((err) => {
                    console.warn('Autoplay failed:', err);
                });
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
            video.addEventListener('loadedmetadata', () => {
                video.play().catch((err) => {
                    console.warn('Autoplay failed (native):', err);
                });
            });
        }

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('waiting', handleWaiting);
            video.removeEventListener('playing', handlePlaying);
            hls?.destroy();
        };
    }, [url]);

    return (
        <div className="relative w-full h-screen bg-black">
            {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <video
                ref={videoRef}
                className="w-full h-full object-contain"
                controls
                autoPlay
                muted
                playsInline
                poster="/default-thumbnail.jpg"
            />
        </div>
    );
}
