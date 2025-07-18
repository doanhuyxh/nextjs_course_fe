
import React, { useState, useEffect, useRef } from 'react';
interface VideoUploadProps {
    initialLink: string;
    onChange: (value: string) => void;
    setDuration: (value: string) => void;
}


export default function VideoIframeUpload({ initialLink, onChange, setDuration }: VideoUploadProps) {
    const [videoUrl, setVideoUrl] = useState(initialLink || '');
    const videoRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (initialLink) {
            setVideoUrl(initialLink);
        }
    }, [initialLink]);

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setVideoUrl(url);
        onChange(url);
    };

    return (
        <div className="flex flex-col gap-2">
            {videoUrl && (
                <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                        ref={videoRef}
                        src={videoUrl}
                        loading="lazy"
                        style={{
                            border: 0,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                        }}
                        
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
            <label className="font-semibold">Video Iframe URL</label>
            <input
                type="text"
                value={videoUrl}
                onChange={handleVideoChange}
                className="border p-2 rounded"
            />
        </div>
    );
}