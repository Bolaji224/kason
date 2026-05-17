import React, { useState } from 'react';
import DeleteModal from './DeleteModal';
import { httpPostWithToken } from '../../../utils/http_utils';
import ls from "localstorage-slim";
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const EmployersDeleteAccount: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate()
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleConfirmDelete = async () => {
    // Handle delete action here
    setModalOpen(false);
    if (loading) return;
    setLoading(true)
    const res = await httpPostWithToken("employer/user/delete");
    if (res.status === "success") {
      ls.remove("wwph_token");
      sessionStorage.clear();
      ls.remove("wwph_usr");
      toast({
        status: "success",
        title: "Account deleted",
        isClosable: true,
        duration: 5000
      })
      navigate("/login")
    } else {
      toast({
        status: "error",
        title: res.error,
        isClosable: true,
        duration: 5000
      })
    }

    setLoading(false)

    console.log('Account deleted');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        onClick={handleOpenModal}
      >
        Delete Account
      </button>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default EmployersDeleteAccount;
