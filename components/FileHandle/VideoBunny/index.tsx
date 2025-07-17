'use client';

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface VideoUploadProps {
  initialLink: string;
  onChange: (value: string) => void;
  setDuration: (value: string) => void;
}

const VideoBunnyUpload: React.FC<VideoUploadProps> = ({ initialLink, onChange, setDuration }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setVideoUrl(value);
    onChange(value);
  };

  useEffect(() => {
    if (initialLink) {
      setVideoUrl(initialLink);
    }
  }, [initialLink]);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const duration = videoRef.current?.duration || 0;
          const minutes = Math.floor(duration / 60);
          const seconds = Math.floor(duration % 60);
          setDuration(`${minutes}:${seconds}`);
        });

        return () => {
          hls.destroy();
        };
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = videoUrl;
      }
    }
  }, [videoUrl]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Video BunnyCDN (.m3u8)</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        <div className="mb-2">
          {videoUrl ? (
            <video
              ref={videoRef}
              controls
              className="mx-auto w-full max-h-[300px]"
              playsInline
            />
          ) : (
            <div className="w-full h-40 flex items-center justify-center text-gray-400">
              Dán link `.m3u8` để xem trước video BunnyCDN
            </div>
          )}
        </div>
        <div className="mt-2">
          <input
            type="text"
            value={videoUrl}
            onChange={handleLinkChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Dán link HLS (.m3u8) từ BunnyCDN"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoBunnyUpload;
