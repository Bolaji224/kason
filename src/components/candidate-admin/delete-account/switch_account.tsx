import React from 'react';

interface SwitchAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  role? : string
}

const SwitchAccountModal: React.FC<SwitchAccountModalProps> = ({ isOpen, onClose, onConfirm, role ="" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="text-center">
          <div className="text-2xl mb-4">Are you sure?</div>
          <p className="mb-4">Are you sure you want to switch to <strong>{role}</strong> account?.</p>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={onConfirm}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchAccountModal;
