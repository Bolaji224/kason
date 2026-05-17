import React from 'react';

const ReplyForm: React.FC = () => {
  return (
    <div className="p-4 border-t">
      <div className="flex mb-2">
        <input type="text" className="flex-1 p-2 border rounded" placeholder="Cc" />
        <input type="text" className="flex-1 p-2 border rounded ml-2" placeholder="Bcc" />
      </div>
      <input type="text" className="w-full p-2 border rounded mb-2" placeholder="To" />
      <textarea className="w-full p-2 border rounded mb-2" placeholder="Your message"></textarea>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Reply</button>
    </div>
  );
};

export default ReplyForm;
