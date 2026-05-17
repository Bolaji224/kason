import React from "react";
import { PlayCircle, CheckCircle2 } from "lucide-react";

interface VideoItem {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
}

interface SidebarProps {
  videos: VideoItem[];
  currentVideoId: number | null;
  onVideoSelect: (video: VideoItem) => void;
}

const CourseContentSidebar: React.FC<SidebarProps> = ({ videos, currentVideoId, onVideoSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Content</h3>
      <div className="space-y-3">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => onVideoSelect(video)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              currentVideoId === video.id ? "bg-green-50 text-green-700" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-3">
              {currentVideoId === video.id ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <PlayCircle className="w-5 h-5 text-gray-400" />
              )}
              <span className="text-sm font-medium">{video.title}</span>
            </div>
            <span className="text-xs text-gray-500">{video.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseContentSidebar;