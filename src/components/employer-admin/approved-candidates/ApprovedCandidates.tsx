import React, { useEffect, useState } from "react";
import { httpGetWithToken, httpPostWithToken } from "../../../utils/http_utils";
import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ApprovedCandidatesPage: React.FC = () => {
  const [approved, setApproved] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [messageText, setMessageText] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchApproved();
  }, []);

  const fetchApproved = async () => {
    setLoading(true);
    try {
      const response = await httpGetWithToken("employer/applications");
      const approvedOnly = response.data.filter(
        (a: any) => a.status === "approved"
      );
      setApproved(approvedOnly);
      setFiltered(approvedOnly);
    } catch (error) {
      console.error("Error fetching approved applicants:", error);
      toast({
        status: "error",
        title: "Failed to load approved candidates.",
        isClosable: true,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Simple search filter
  const handleSearch = (value: string) => {
    setSearch(value);
    const filteredList = approved.filter((a) =>
      a.user?.name?.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredList);
  };

  // Open message modal
  const openMessageModal = (candidate: any) => {
    setSelectedCandidate(candidate);
    setMessageText("");
    setIsModalOpen(true);
  };

  // Send message and redirect
  const sendMessage = async () => {
    if (!messageText.trim()) {
      toast({
        status: "warning",
        title: "Please enter a message.",
      });
      return;
    }

    try {
      await httpPostWithToken("employer/send-message", {
        receiver_id: selectedCandidate.user?.id,
        message: messageText,
      });

      toast({
        status: "success",
        title: "Message sent successfully!",
      });

      setIsModalOpen(false);
      navigate("/employers-messages");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        status: "error",
        title: "Failed to send message.",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className="lg:ml-64 p-6 bg-gray-100 min-h-screen py-[8rem]">
      {/* Header */}
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Approved Candidates
          </h1>
          <p className="text-gray-600">
            Manage and connect with the candidates you've approved.
          </p>
        </div>

        <div className="flex gap-3 items-center w-full md:w-auto">
          <input
            type="text"
            placeholder="Search candidate..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm w-full md:w-60"
          />
          <button
            onClick={() => navigate("/employer/applicants")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Back to Applicants
          </button>
        </div>
      </header>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
          No approved candidates yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a) => (
            <div
              key={a.id}
              className="p-5 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              {/* Candidate Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={
                    a.user?.avatar
                      ? a.user.avatar.startsWith('http') 
                        ? a.user.avatar 
                        : `${import.meta.env.VITE_API_URL?.replace('/api/v1', '')}/${a.user.avatar}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(a.user?.name || 'User')}&background=0D8ABC&color=fff`
                  }
                  alt={a.user?.name || "Candidate"}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    {a.user?.name || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {a.job?.title || "No job title"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {a.job?.location || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Rating + Skills + Salary */}
              <div className="mt-4 text-sm text-gray-600 space-y-2">
                <p>
                  ⭐ <span className="font-medium">4.8/5</span> Rating
                </p>
                <p>
                  💰 Expected Salary:{" "}
                  <span className="font-medium">
                    £{a.user?.expected_salary || "Negotiable"}
                  </span>
                </p>
                <p>
                  🧠 Skills:{" "}
                  <span className="text-gray-700">
                    {a.user?.skills || "Not specified"}
                  </span>
                </p>
              </div>

              {/* Actions */}
              <div className="mt-5 flex justify-between items-center">
                <button
  onClick={() => navigate(`/candidate-profile/${a.user?.id}`, {
    state: { applicant: a }
  })}
  className="text-green-600 hover:underline"
>
  View Profile
</button>

                <div className="flex gap-2">
                  <button
                    onClick={() => openMessageModal(a)}
                    className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
                  >
                    Message
                  </button>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Approved
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Message Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Message {selectedCandidate?.user?.name || "Candidate"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={sendMessage}>
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ApprovedCandidatesPage;