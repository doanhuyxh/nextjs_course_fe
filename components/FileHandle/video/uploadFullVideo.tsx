'use client';

import React, { useEffect, useState, useRef } from 'react';
import Hls from 'hls.js';
import { toast } from 'react-hot-toast';
import LoadingVideo from '../../Loading/LoadingVideo';
import { generateSlug } from '@/libs/utils';

interface VideoUploadProps {
  initialLink: string;
  onChange: (value: string) => void;
  setDuration: (value: string) => void;
}

const VideoUploadFull: React.FC<VideoUploadProps> = ({ initialLink, onChange, setDuration }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(initialLink);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const isM3U8 = (url: string) => url.endsWith('.m3u8');

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setVideoUrl(value);
    onChange(value);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Kiểm tra định dạng
    if (file.type !== 'video/mp4') {
      toast.error('Vui lòng chọn định dạng video .mp4', {
        duration: 8000,
        position: 'top-right',
        style: { background: '#f44336', color: '#fff' },
      });
      return;
    }

    // Lấy thời lượng video
    const video = document.createElement('video');
    const fileURL = URL.createObjectURL(file);
    video.src = fileURL;
    video.addEventListener('loadedmetadata', () => {
      const duration = video.duration;
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      setDuration(`${minutes}:${seconds}`);
      URL.revokeObjectURL(fileURL);
    });

    toast.success('Đang tải video lên...', {
      duration: 8000,
      position: 'top-right',
      style: { background: '#4CAF50', color: '#fff' },
    });

    const fileName = generateSlug(file.name.replace(/\.[^/.]+$/, '').toLowerCase())+ `${Date.now().toString(36)}`;
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const chunks: Blob[] = [];

    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      chunks.push(file.slice(start, end));
    }

    setIsUploading(true);
    setVideoUrl('');

    try {
      const uploadPromises = chunks.map((chunk, index) => {
        const chunkFile = new File([chunk], `${fileName}-part-${index + 1}.mp4`, {
          type: 'video/mp4',
        });

        const formData = new FormData();
        formData.append('file', chunkFile, `${fileName}-part-${index + 1}.mp4`);
        formData.append('fileName', fileName);

        return fetch(`${process.env.MEDIA_UPLOAD_URL}/api/v1/upload/large`, {
          method: 'POST',
          body: formData,
        }).then(res => {
          if (!res.ok) throw new Error(`Chunk ${index + 1} upload failed`);
          return res.json();
        });
      });

      const uploadResults = await Promise.all(uploadPromises); // ← giữ đúng thứ tự map
      console.log('✅ Kết quả upload:', uploadResults);

      // gộp file tải lên
      const mergedFileResponse = await fetch(`${process.env.MEDIA_UPLOAD_URL}/api/v1/upload/mergevideo?fileName=${fileName}`)
      const mergedFileData = await mergedFileResponse.json();
      if (!mergedFileResponse.ok) {
        throw new Error('Gộp file tải lên không thành công');
      }
      const videoUrl = `${process.env.MEDIA_UPLOAD_URL}${mergedFileData.data}`;
      setVideoUrl(videoUrl);
      onChange(videoUrl);

      event.target.value = ''; // reset input file

      toast.success('Tải video lên thành công!', {
        duration: 6000,
        position: 'top-right',
        style: { background: '#4CAF50', color: '#fff' },
      });

    } catch (error) {
      console.error('❌ Lỗi:', error);
      toast.error('Lỗi khi tải lên một hoặc nhiều phần video!', {
        duration: 6000,
        position: 'top-right',
        style: { background: '#f44336', color: '#fff' },
      });
    } finally {
      setIsUploading(false);
    }
  };


  useEffect(() => {
    if (videoUrl && isM3U8(videoUrl) && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = videoUrl;
      }
    }
  }, [videoUrl]);

  useEffect(() => {
    return () => {
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach((input: any) => (input.value = ''));
    };
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Video</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        <div className="mb-2">
          {videoUrl ? (
            <div>
              {isM3U8(videoUrl) ? (
                <video ref={videoRef} className="mx-auto w-auto max-h-[300px]" controls />
              ) : (
                <video className="mx-auto w-auto max-h-[300px]" controls>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ) : (
            <div className="w-full h-40">
              {!isUploading ? (
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <LoadingVideo />
              )}
            </div>
          )}
        </div>

        <div className="text-sm text-gray-600 flex gap-2 m-auto w-fit">
          <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:bg-green-500 hover:text-white px-2">
            <span>Tải video (.mp4)</span>
            <input type="file" className="sr-only" accept="video/mp4" onChange={handleFileChange} />
          </label>
          <strong className="opacity-40">Chỉ chấp nhận video định dạng MP4</strong>
        </div>

        <div className="mt-2">
          <input
            type="text"
            value={videoUrl || ''}
            onChange={handleLinkChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Hoặc dán đường dẫn video tại đây"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoUploadFull;
