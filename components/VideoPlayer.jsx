"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ src, poster, title }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !src) return;

    if (src.endsWith(".m3u8") && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }

    video.src = src;
  }, [src]);

  if (!src) {
    return (
      <div className="grid aspect-video place-items-center rounded-3xl border border-white/10 bg-black/40 text-white/60">
        Stream belum tersedia.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-glow">
      <video
        ref={videoRef}
        controls
        playsInline
        poster={poster}
        className="aspect-video w-full bg-black"
      />

      <div className="border-t border-white/10 bg-panel px-5 py-4">
        <p className="text-sm text-white/50">Now Playing</p>
        <h3 className="text-lg font-black">{title}</h3>
      </div>
    </div>
  );
}
