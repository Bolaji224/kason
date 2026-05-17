import React from 'react';

const VideoPlayer = () => {
  return (
    <div className="container mx-auto p-6">
      <video controls className="w-full h-96 bg-black">
        <source src="course-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
