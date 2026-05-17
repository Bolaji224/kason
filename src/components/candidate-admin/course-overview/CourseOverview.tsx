import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Clock,
  CheckCircle,
  Lock,
  ChevronDown,
  ChevronUp,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
} from 'lucide-react';

// Import the QuizPage from the sibling folder (path A)
import QuizPage from '../quizpage/Quizpage';

// ---------- Types (renamed to avoid collisions) ----------
interface VideoType {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  videoUrl: string;
  description?: string;
}

interface ModuleType {
  id: string;
  title: string;
  description: string;
  progress: string;
  totalDuration: string;
  videos: VideoType[];
  quiz?: {
    title: string;
    questions: number;
    completed: boolean;
  };
}

// ---------------- Video Player Component ----------------
const VideoPlayer: React.FC<{
  currentVideo: VideoType | null;
  onVideoComplete?: (videoId: string) => void;
}> = ({ currentVideo, onVideoComplete }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showQuiz, setShowQuiz] = useState(true);


  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      if (currentVideo && onVideoComplete) onVideoComplete(currentVideo.id);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentVideo, onVideoComplete]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) video.pause();
    else video.play();
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleContinueCourse = () => {
  setShowQuiz(false); // switch from quiz to course content
};


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
      {/* Video Container */}
      <div
        className="relative bg-gray-900 aspect-video"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          className="w-full h-full"
          src={currentVideo.videoUrl}
          poster="/api/placeholder/800/450"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={togglePlay}
        />

        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <button
              onClick={togglePlay}
              className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all transform hover:scale-105"
            >
              <Play className="w-8 h-8 text-gray-900 ml-1" />
            </button>
          </div>
        )}

        {/* Video Controls */}
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
            {/* Progress Bar */}
            <div className="mb-4 cursor-pointer" onClick={handleSeek}>
              <div className="w-full bg-white/30 rounded-full h-1">
                <div
                  className="bg-purple-500 rounded-full h-1 transition-all"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <button onClick={togglePlay} className="hover:text-purple-400 transition-colors">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button onClick={() => skip(-10)} className="hover:text-purple-400 transition-colors">
                  <SkipBack className="w-5 h-5" />
                </button>
                <button onClick={() => skip(10)} className="hover:text-purple-400 transition-colors">
                  <SkipForward className="w-5 h-5" />
                </button>
                <span className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button onClick={toggleMute} className="hover:text-purple-400 transition-colors">
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentVideo.title}</h2>
        <p className="text-gray-600 mb-4">
          {currentVideo.description ||
            "Learn the essential concepts and practical applications in this comprehensive video lesson."}
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Duration: {currentVideo.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            {currentVideo.completed ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Completed</span>
              </>
            ) : (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-purple-600"></div>
                <span>In Progress</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------- VideoListItem Component (renamed to avoid type collisions) ----------------
const VideoListItem: React.FC<{
  video: VideoType;
  isActive: boolean;
  onSelect: (video: VideoType) => void;
}> = ({ video, isActive, onSelect }) => (
  <button
    onClick={() => !video.locked && onSelect(video)}
    disabled={video.locked}
    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
      isActive ? 'bg-purple-50 border-purple-200 shadow-sm' : video.locked ? 'bg-gray-50 border-gray-100 cursor-not-allowed' : 'bg-white border-gray-100 hover:border-purple-200 hover:shadow-sm cursor-pointer'
    }`}
  >
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            video.locked ? 'bg-gray-100' : isActive ? 'bg-purple-100' : video.completed ? 'bg-green-100' : 'bg-blue-100'
          }`}
        >
          {video.locked ? (
            <Lock className="w-4 h-4 text-gray-400" />
          ) : video.completed ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : (
            <Play className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-blue-600'}`} />
          )}
        </div>
      </div>
      <div className="text-left">
        <h4 className={`font-medium ${video.locked ? 'text-gray-400' : 'text-gray-900'}`}>{video.title}</h4>
      </div>
    </div>
    <div className="flex items-center space-x-2 text-sm text-gray-500">
      <Clock className="w-4 h-4" />
      <span>{video.duration}</span>
    </div>
  </button>
);

// ---------------- QuizItem Component ----------------
const QuizItem: React.FC<{
  quiz: { title: string; questions: number; completed: boolean };
  onClick?: () => void;
}> = ({ quiz, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-100"
  >
    <div className="flex items-center space-x-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${quiz.completed ? 'bg-green-100' : 'bg-blue-100'}`}>
        {quiz.completed ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded bg-blue-600"></div>}
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{quiz.title}</h4>
        <p className="text-sm text-gray-600">{quiz.questions} questions</p>
      </div>
    </div>
  </div>
);

// ---------------- CourseContentSidebar Component ----------------
const CourseContentSidebar: React.FC<{
  modules: ModuleType[];
  overviewVideos: VideoType[];
  currentVideo: VideoType | null;
  onVideoSelect: (video: VideoType) => void;
  onQuizSelect: () => void;
}> = ({ modules, overviewVideos, currentVideo, onVideoSelect, onQuizSelect }) => {
  const [expandedModules, setExpandedModules] = useState<string[]>(['overview']);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => (prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900">Course Content</h3>
        <p className="text-sm text-gray-600 mt-1">5 modules • 17 videos • 6 quizzes</p>
      </div>

      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {/* Overview Section */}
        <div>
          <button onClick={() => toggleModule('overview')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="text-sm font-medium text-gray-900">Course Introduction</div>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">2 videos</span>
            </div>
            {expandedModules.includes('overview') ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
          </button>

          {expandedModules.includes('overview') && (
            <div className="mt-3 space-y-2">
              {overviewVideos.map(video => (
                <VideoListItem key={video.id} video={video} isActive={currentVideo?.id === video.id} onSelect={onVideoSelect} />
              ))}
            </div>
          )}
        </div>

        {/* Modules */}
        {modules.map(module => (
          <div key={module.id}>
            <button onClick={() => toggleModule(module.id)} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">{module.title}</div>
                <div className="text-xs text-gray-600 flex items-center space-x-2">
                  <span>{module.progress}</span>
                  <span>•</span>
                  <span>{module.totalDuration}</span>
                </div>
              </div>
              {expandedModules.includes(module.id) ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
            </button>

            {expandedModules.includes(module.id) && (
              <div className="mt-3 space-y-2">
                {module.videos.map(video => (
                  <VideoListItem key={video.id} video={video} isActive={currentVideo?.id === video.id} onSelect={onVideoSelect} />
                ))}
                {module.quiz && <QuizItem quiz={module.quiz} onClick={onQuizSelect} />}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------------- Progress Card ----------------
const ProgressCard: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="mt-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-6 text-white">
    <h4 className="font-semibold mb-2">Your Progress</h4>
    <div className="flex items-center mb-3">
      <div className="flex-1 bg-white/20 rounded-full h-2">
        <div className="bg-white rounded-full h-2 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <span className="ml-3 text-sm font-medium">{progress}%</span>
    </div>
    <p className="text-purple-100 text-sm">Keep up the great work!</p>
  </div>
);

// ---------------- Tab Navigation ----------------
const TabNavigation: React.FC<{ activeTab: string; onTabChange: (tab: string) => void }> = ({ activeTab, onTabChange }) => (
  <div className="flex border-b border-gray-200 mb-8">
    {[
      { id: 'video', label: 'Video Player' },
      { id: 'overview', label: 'Overview' },
      { id: 'notes', label: 'Notes' },
      { id: 'resources', label: 'Resources' },
    ].map(tab => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={`px-6 py-3 font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

// ---------------- Main CourseOverview ----------------
const CourseOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentVideo, setCurrentVideo] = useState<VideoType | null>(null);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false); // when true, render QuizPage

  // Sample data with working video URLs (same as you provided)
  const overviewVideos: VideoType[] = [
    {
      id: 'intro-1',
      title: 'Course Introduction',
      duration: '1:01min',
      completed: false,
      locked: false,
      videoUrl: 'https://vz-99fa4eb8-1fc.b-cdn.net/a2231b94-637c-4b86-9c23-1ad01708c261/playlist.m3u8',
      description: "Welcome to the course! Get an overview of what you'll learn and how the course is structured.",
    },
    {
      id: 'intro-2',
      title: 'Getting Started',
      duration: '59min',
      completed: false,
      locked: false,
      videoUrl: 'https://vz-99fa4eb8-1fc.b-cdn.net/5da3c4be-81e8-4b8a-9fa1-527b9d008a23/playlist.m3u8',
      description: "Learn how to set up your environment and get ready for the exciting journey ahead.",
    },
  ];

  const modules: ModuleType[] = [
    {
      id: 'module-1',
      title: 'Module 1: Foundation Concepts',
      description: 'Learn the fundamental concepts and principles',
      progress: '0/3',
      totalDuration: '45min',
      videos: [
        {
          id: 'm1-v1',
          title: 'Understanding the Basics',
          duration: '12min',
          completed: false,
          locked: false,
          videoUrl: 'https://vz-99fa4eb8-1fc.b-cdn.net/a2231b94-637c-4b86-9c23-1ad01708c261/playlist.m3u8',
          description: "Dive into the core concepts that form the foundation of everything you'll learn.",
        },
        {
          id: 'm1-v2',
          title: 'Core Principles',
          duration: '15min',
          completed: false,
          locked: false,
          videoUrl: 'https://vz-99fa4eb8-1fc.b-cdn.net/a2231b94-637c-4b86-9c23-1ad01708c261/playlist.m3u8',
          description: 'Explore the essential principles that guide best practices in this field.',
        },
        {
          id: 'm1-v3',
          title: 'Practical Applications',
          duration: '18min',
          completed: false,
          locked: false,
          videoUrl: 'https://vz-99fa4eb8-1fc.b-cdn.net/a2231b94-637c-4b86-9c23-1ad01708c261/playlist.m3u8',
          description: "See how to apply what you've learned in real-world scenarios.",
        },
      ],
      quiz: { title: 'Module 1 Quiz', questions: 10, completed: false },
    },
    // Other modules would follow similar pattern
  ];

  const handleVideoSelect = (video: VideoType) => {
    setCurrentVideo(video);
    setActiveTab('video');
    setShowQuiz(false);
  };

  const handleVideoComplete = (videoId: string) => {
    setCompletedVideos(prev => (prev.includes(videoId) ? prev : [...prev, videoId]));
    // note: you could also update the specific video.completed flag here if you store modules in state
  };

  const calculateProgress = () => {
    const totalVideos = overviewVideos.length + modules.reduce((acc, module) => acc + module.videos.length, 0);
    if (totalVideos === 0) return 0;
    return Math.round((completedVideos.length / totalVideos) * 100);
  };

  // If quiz is requested, render the QuizPage (keeps entire page layout simple for presentation)
  if (showQuiz) {
    return <QuizPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:ml-64 mt-12">
      {/* Header */}
      <div className="bg-[#FFF5F8]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-[#1E2A38]">
            <h1 className="text-4xl font-bold mb-4">Virtual Assistance Course</h1>
            <p className="text-xl text-[#646A73] mb-6">Master the fundamentals and advanced techniques in this comprehensive course</p>
            <div className="flex items-center space-x-6 text-[#646A73]">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>3.5 hours total</span>
              </div>
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>6 videos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded bg-blue-500"></div>
                <span>3 quizzes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Content based on active tab */}
            {activeTab === 'video' && <VideoPlayer currentVideo={currentVideo} onVideoComplete={handleVideoComplete} />}

            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Description</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    This comprehensive course is designed to take you from beginner to expert level.
                    You'll learn through practical examples, real-world case studies, and hands-on exercises.
                    Each module builds upon the previous one, ensuring a smooth learning progression.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">6</div>
                      <div className="text-sm text-gray-600">Video Lessons</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">3</div>
                      <div className="text-sm text-gray-600">Quizzes</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">3.5</div>
                      <div className="text-sm text-gray-600">Hours Content</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Notes</h2>
                <p className="text-gray-600">Your notes will appear here as you progress through the course.</p>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Resources</h2>
                <p className="text-gray-600">Download materials, worksheets, and additional resources.</p>
              </div>
            )}
          </div>

          {/* Course Content Sidebar */}
          <div className="lg:w-96">
            <CourseContentSidebar
              modules={modules}
              overviewVideos={overviewVideos}
              currentVideo={currentVideo}
              onVideoSelect={handleVideoSelect}
              onQuizSelect={() => setShowQuiz(true)}
            />

            <ProgressCard progress={calculateProgress()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
