'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';
import useLocalStorage from '@/libs/hooks/useLocalStorage';

export default function VideoM3U8({ url }: { url: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [loading, setLoading] = useState(true);
    const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);
    const [qualities, setQualities] = useState<{ label: string; level: number }[]>([]);
    const [selectedQuality, setSelectedQuality] = useState(-1); // -1 = auto
    const [playbackRate, setPlaybackRate] = useState(1);
    const reportedRef = useRef<Set<number>>(new Set());
    const [useVideoProgress, setUseVideoProgress] = useLocalStorage<number>("vt", 0);

    // Gửi tiến độ xem về server
    const reportProgress = useCallback(async (percent: number) => {
        try {
            setUseVideoProgress(percent);
        } catch (err) {
            console.error('🚨 Failed to report progress:', err);
        }
    }, [setUseVideoProgress]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !url) return;

        let hls: Hls | null = null;

        const handleCanPlay = () => {
            setLoading(false);
            const percent = useVideoProgress; // ví dụ từ searchParam vt=30
            const duration = video.duration;
            if (duration && percent > 0 && percent <= 100) {
                const seekTime = (duration * percent) / 100;
                video.currentTime = seekTime;
                console.log(`⏩ Seeked to ${seekTime}s`);
            }
            video.play().catch((err) => console.warn('Autoplay failed:', err));
        };

        const handleWaiting = () => setLoading(true);

        const handleTimeUpdate = () => {
            const current = video.currentTime;
            const duration = video.duration;
            if (!duration || duration === Infinity) return;

            const percent = Math.floor((current / duration) * 100);
            const milestones = [25, 50, 75, 100];

            milestones.forEach((threshold) => {
                if (percent >= threshold && !reportedRef.current.has(threshold)) {
                    reportedRef.current.add(threshold);
                    reportProgress(threshold);
                }
            });
        };

        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('timeupdate', handleTimeUpdate);

        if (Hls.isSupported()) {
            hls = new Hls({ startLevel: -1 });
            setHlsInstance(hls);

            hls.loadSource(url);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (!hls) return;
                const levels = hls.levels;
                const qualityOptions = levels.map((level, index) => ({
                    label: `${level.height}p`,
                    level: index,
                }));
                setQualities([{ label: 'Auto', level: -1 }, ...qualityOptions]);
                setSelectedQuality(-1);
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error('HLS.js error:', data);
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
            video.load();
        }

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('waiting', handleWaiting);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            hls?.destroy();
        };
    }, []);

    useEffect(() => {
        if (hlsInstance) {
            hlsInstance.currentLevel = selectedQuality;
        }
    }, [selectedQuality, hlsInstance]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackRate;
        }
    }, [playbackRate]);

    return (
        <div className="relative w-full bg-black">
            <video
                ref={videoRef}
                className="w-full h-screen object-contain"
                controls
                playsInline
                autoPlay
                muted
                poster="/default-thumbnail.jpg"
            />

            {loading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-70 pointer-events-none">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <div className="absolute bottom-4 right-4 z-30 flex gap-3 bg-white/20 backdrop-blur-md p-2 rounded-md text-white text-sm">
                <select
                    value={selectedQuality}
                    onChange={(e) => setSelectedQuality(parseInt(e.target.value))}
                    className="bg-black bg-opacity-50 px-2 py-1 rounded"
                >
                    {qualities.map((q) => (
                        <option key={q.level} value={q.level}>
                            {q.label}
                        </option>
                    ))}
                </select>

                <select
                    value={playbackRate}
                    onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                    className="bg-black bg-opacity-50 px-2 py-1 rounded"
                >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x (chậm như giọng nữ)</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                </select>
            </div>
        </div>
    );
}
