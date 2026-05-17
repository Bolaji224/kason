import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { httpGetWithToken } from "./../../../utils/http_utils";

const CandidateProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const initialApplicant = location.state?.applicant || null;
  const [applicant, setApplicant] = useState<any>(initialApplicant);
  const [loading, setLoading] = useState(!initialApplicant);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (applicant) return;

    const fetchApplicant = async () => {
      setLoading(true);
      try {
        const response = await httpGetWithToken(`employer/applications/${id}`);
        if (response?.data) {
          setApplicant(response.data);
        } else {
          setError("Applicant not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch applicant data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchApplicant();
    else {
      setError("Invalid applicant ID.");
      setLoading(false);
    }
  }, [id, applicant]);

  if (loading) return <div>Loading applicant data...</div>;
  if (error) return <div>{error}</div>;
  if (!applicant) return <div>No applicant data available</div>;

  const user = applicant.user || applicant;
  const isBrowseCandidate = !applicant.job;
  const cvLink = applicant.smartcv || applicant.cv || null;

  return (
    <div className="ml-60 mt-12 p-6 bg-gray-100 min-h-screen py-[8rem]">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Candidate Profile</h1>
        <p className="text-gray-600">
          {user?.name || `${user?.first_name || ""} ${user?.last_name || ""}` || "Unnamed Candidate"}
        </p>
      </header>

      <div className="bg-white p-6 rounded shadow space-y-4">

        {isBrowseCandidate && user?.email && (
          <p><strong>Email:</strong> {user.email}</p>
        )}

        {user?.bio && (
          <p><strong>Bio:</strong> {user.bio}</p>
        )}

        {applicant?.experience_years && (
          <p>
            <strong>Experience:</strong> {applicant.experience_years}{" "}
            {applicant.experience_years === 1 ? "year" : "years"}
          </p>
        )}

        {cvLink && (
          <p>
            <strong>{applicant.smartcv ? "SmartCV" : "CV"}:</strong>{" "}
            <a href={cvLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {applicant.smartcv ? "View SmartCV" : "View CV"}
            </a>
          </p>
        )}

        {!isBrowseCandidate && applicant?.job && (
          <p><strong>Job:</strong> {applicant.job.title}</p>
        )}

        {!isBrowseCandidate && applicant?.reason && (
          <p><strong>Reason for applying:</strong> {applicant.reason}</p>
        )}

        {!isBrowseCandidate && applicant?.status && (
          <p><strong>Status:</strong> {applicant.status}</p>
        )}

      </div>
    </div>
  );
};

export default CandidateProfile;