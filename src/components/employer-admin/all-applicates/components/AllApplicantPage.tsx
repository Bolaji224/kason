import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApplicantCard from "./AllApplicantCard";
import { httpGetWithToken, httpPostWithToken } from "../../../../utils/http_utils";
import { useToast } from "@chakra-ui/react";
import Modal from "./Modal";

const ApplicantsPage: React.FC = () => {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [filteredApplicants, setFilteredApplicants] = useState<any[]>([]);
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [selectedApplicantId, setSelectedApplicantId] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { slug: jobSlug } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  // Fetch job and applicants data
  useEffect(() => {
    fetchJobData();
  }, [jobSlug]);

  useEffect(() => {
    filterApplicants();
  }, [searchTerm, statusFilter, applicants]);

  const fetchJobData = async () => {
    setLoading(true);
    try {
      const response = await httpGetWithToken("employer/applications");
      console.log("Applicants response:", response.data);

      setApplicants(response.data || []);
      setJobDetails(response.data?.[0]?.job || null);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      toast({
        status: "error",
        title: "Failed to load applications.",
        isClosable: true,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter applicants (frontend only)
  const filterApplicants = () => {
    let filtered = applicants;
    if (searchTerm) {
      filtered = filtered.filter((a) =>
        a.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.user?.skills?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }
    setFilteredApplicants(filtered);
  };

  const approveApplicant = async (id: number) => {
    if (loading) return;
    setLoading(true);
    try {
      await httpPostWithToken(`employer/applications/${id}/update-status`, { status: "approved" });
      setApplicants((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "approved" } : a))
      );
      toast({
        status: "success",
        title: "Applicant approved successfully!",
        isClosable: true,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error approving applicant:", error);
      toast({
        status: "error",
        title: "Failed to approve applicant.",
        isClosable: true,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const rejectApplicant = async (id: number) => {
    if (loading) return;
    setLoading(true);
    try {
      await httpPostWithToken(`employer/applications/${id}/update-status`, { status: "rejected" });
      fetchJobData();
      toast({
        status: "success",
        title: "Applicant rejected successfully!",
        isClosable: true,
        duration: 5000,
      });
    } catch (error) {
      console.error("Error rejecting applicant:", error);
      toast({
        status: "error",
        title: "Failed to reject applicant.",
        isClosable: true,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const messageApplicant = async (id: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const payload = { receiver_id: id, message: messageText };
      const res = await httpPostWithToken("chat/send-chat", payload);
      const chatId = res?.data?.id ?? res?.data?.chat_id ?? null;

      toast({
        status: "success",
        title: "Message sent successfully!",
        isClosable: true,
        duration: 5000,
      });

      if (chatId) {
        navigate("/employers-messages", { state: { chatId } });
      } else {
        navigate("/employers-messages");
      }
    } catch (error) {
      console.error("Error messaging applicant:", error);
      toast({
        status: "error",
        title: "Failed to send message.",
        isClosable: true,
        duration: 5000,
      });
    } finally {
      setLoading(false);
      setModalVisible(false);
      setMessageText("");
    }
  };

  if (!jobDetails && loading) {
    return <div className="p-6 text-center text-gray-600">Loading job details...</div>;
  }

  return (
    <div className="lg:ml-64 p-6 bg-gray-50 min-h-screen py-[8rem]">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Applicants</h1>
        {jobDetails && <p className="text-gray-600">{jobDetails.title}</p>}
      </header>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search applicants..."
            className="border rounded-lg px-3 py-2 w-full md:w-64 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="submitted">Pending</option>
          </select>
        </div>

        <div className="text-sm text-gray-700">
          <span className="mr-4">
            <strong>Total:</strong> {applicants.length}
          </span>
          <span className="mr-4 text-green-600">
            <strong>Approved:</strong> {applicants.filter(a => a.status === "approved").length}
          </span>
          <span className="text-red-600">
            <strong>Rejected:</strong> {applicants.filter(a => a.status === "rejected").length}
          </span>
        </div>
      </div>

      {/* Applicant Cards */}
      {filteredApplicants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredApplicants.map((applicant, index) => (
            <ApplicantCard
              key={applicant.id}
              name={applicant.user?.name || "Unknown"}
              role={applicant.job?.title || "No job title"}
              location={applicant.job?.location || "Not specified"}
              rate={applicant.job?.salary || 0}
              skills={
                applicant.user?.skills
                  ? applicant.user.skills.split(",").map((s: string) => s.trim())
                  : ["N/A"]
              }
           profileImage={
  applicant.user?.avatar
    ? applicant.user.avatar.startsWith('http')
      ? applicant.user.avatar
      : `${import.meta.env.VITE_API_URL?.replace('/api/v1', '')}/${applicant.user.avatar}`
    : "/default-avatar.png"
}
              status={applicant.status}
              onDelete={() =>
                setApplicants((prev) => prev.filter((_, i) => i !== index))
              }
              onApprove={() => approveApplicant(applicant.id)}
              onReject={() => rejectApplicant(applicant.id)}
              onView={() =>
                navigate(`/candidate-profile/${applicant.user?.id}`, {
                  state: { applicant },
                })
              }
              onMessage={() => {
                setSelectedApplicantId(applicant.user);
                setModalVisible(true);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600 text-lg">No applicants found.</p>
        </div>
      )}

      {/* Messaging Modal */}
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        title={`Send Message to ${selectedApplicantId?.name || ""}`}
      >
        <div className="relative">
          <button
            onClick={() => setModalVisible(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            <span className="text-2xl">×</span>
          </button>
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring focus:ring-blue-100"
            rows={4}
            placeholder="Type your message here..."
          />
          <button
            onClick={() =>
              selectedApplicantId && messageApplicant(selectedApplicantId.id)
            }
            className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ApplicantsPage;
