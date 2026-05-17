import React from "react";

interface BadgeModalProps {
  message: string;
  onClose: () => void;
}

const BadgeModal: React.FC<BadgeModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
        <h2 className="text-xl font-bold mb-3">🎉 SkillStamp Earned!</h2>
        <p className="text-gray-700 mb-5">{message}</p>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BadgeModal;
