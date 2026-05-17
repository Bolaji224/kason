import React from 'react';

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="bg-white p-6 rounded-t-lg shadow-lg w-full max-w-md animate-slideUp relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold text-center mb-2">
          Welcome to <span className="text-[#1E2A38]">Weworkperhour</span>
        </h2>
        <p className="text-sm text-gray-700 text-center">
          You need to get <strong>SkillStamp</strong> before continuing.
        </p>
      </div>
    </div>
  );
};

export default PopupModal;
