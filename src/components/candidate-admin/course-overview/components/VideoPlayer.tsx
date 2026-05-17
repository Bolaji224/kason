import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import { Play } from "lucide-react";

interface VideoItem {
  id: number | string;
  title: string;
  duration: string;
  videoUrl: string;
  description?: string;
}

const VideoPlayer: React.FC<{ currentVideo: VideoItem | null }> = ({ currentVideo }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!currentVideo || !videoRef.current) return;
    const video = videoRef.current;

    // If URL ends with .m3u8 → use HLS.js
    if (currentVideo.videoUrl.includes(".m3u8")) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(currentVideo.videoUrl);
        hls.attachMedia(video);

        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari native HLS support
        video.src = currentVideo.videoUrl;
      }
    } else {
      // Direct MP4 playback
      video.src = currentVideo.videoUrl;
    }
  }, [currentVideo]);

  if (!currentVideo) {
    return (
      <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-white/70" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Select a video to start learning</h3>
          <p className="text-white/70">Choose any video from the course content to begin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Video Area */}
      <div className="relative bg-gray-900 aspect-video">
        <video
          ref={videoRef}
          controls
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>

      {/* Video Info */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentVideo.title}</h2>
        <p className="text-gray-600 mb-4">
          {currentVideo.description ||
            "Learn the essential concepts and practical applications in this comprehensive video lesson."}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
