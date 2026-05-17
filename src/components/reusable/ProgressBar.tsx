import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-[#b6d7ff] rounded-[20px] h-[5px]">
      <div
        className="bg-[#5ba4fd] h-[5px] rounded-[20px] transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
