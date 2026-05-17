import React from 'react';

const ChatDetails: React.FC = () => {
  return (
    <div className="p-4 flex-1">
      <div className="border-b border-[#2aa100] pb-4 mb-4">
        <div className="font-bold text-lg">Account Manager</div>
        <div className="text-gray-500">Hello, Greeting from Uber. Hope you doing great...</div>
      </div>
      <div className="mb-4">
        {/* Add attachments and other details here */}
      </div>
    </div>
  );
};

export default ChatDetails;
