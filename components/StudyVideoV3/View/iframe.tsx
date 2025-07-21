'use client';

import { useEffect } from 'react';

import useLocalStorage from '@/libs/hooks/useLocalStorage';

export default function IframeVideo({ iframe }: { iframe: string }) {
  const [, setUseVideoProgress] = useLocalStorage<number>("vt", 0);

  useEffect(() => {
    // 1. Load player.js Bunny nếu chưa có
    const script = document.createElement('script');
    script.src = '//assets.mediadelivery.net/playerjs/playerjs-latest.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const player = new (window as any).playerjs.Player('bunny-player');

      player.on('ready', () => {
        player.getDuration((duration: number) => {
        });
      });

      player.on('timeupdate', (data: any) => {
        const { seconds, duration } = data;
        const percent = (seconds / duration) * 100;
        setUseVideoProgress(percent);
      });
    };

    return () => {
      document.body.removeChild(script); // cleanup khi unmount
    };
  }, []);

  return (
    <div className="w-full aspect-video bg-black">
      <iframe
        id="bunny-player"
        className="w-full h-full"
        src={`${iframe}?autoplay=true&loop=true&muted=true&preload=true&responsive=true`}
        loading="lazy"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
