'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface VideoUploadProps {
  initialLink: string;
  onChange: (value: string) => void;
  setDuration: (value: string) => void;
}

const isYouTubeUrl = (url: string) => {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
};

const getYouTubeEmbedUrl = (url: string): string => {
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
};

const VideoYoutubeUpload: React.FC<VideoUploadProps> = ({ initialLink, onChange, setDuration }) => {
  const [videoUrl, setVideoUrl] = useState<string>('');

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setVideoUrl(value);

    if (isYouTubeUrl(value)) {
      onChange(value);
      setDuration('0:00'); // Không thể lấy duration trực tiếp
    } else {
      toast.error('Chỉ hỗ trợ đường dẫn YouTube hợp lệ.', {
        duration: 5000,
        position: 'top-right',
        style: { background: '#f44336', color: '#fff' },
      });
    }
  };

  useEffect(() => {
    if (initialLink) {
      setVideoUrl(initialLink);
    }
  }, [initialLink]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Video YouTube</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        <div className="mb-2">
          {videoUrl && isYouTubeUrl(videoUrl) ? (
            <iframe
              src={getYouTubeEmbedUrl(videoUrl)}
              width="auto"
              height="500"
              allowFullScreen
              className="mx-auto rounded-md"
            ></iframe>
          ) : (
            <div className="text-gray-400 text-sm h-[300px] flex items-center justify-center">
              Dán link video YouTube để xem trước
            </div>
          )}
        </div>

        <input
          type="text"
          value={videoUrl}
          onChange={handleLinkChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Dán link YouTube tại đây (https://www.youtube.com/...)"
        />
      </div>
    </div>
  );
};

export default VideoYoutubeUpload;
