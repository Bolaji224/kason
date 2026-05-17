import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { httpGetWithToken } from "../../../../utils/http_utils";

interface Applicant {
  id: string;
  name: string;
  email: string;
  applicationDate: string;
}

const JobDetailsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [jobTitle, setJobTitle] = useState<string>("");

  useEffect(() => {
    const fetchApplicants = async () => {
      const response = await httpGetWithToken(`employer/jobs/${jobId}/applicants`);
      if (response.status === "success") {
        setApplicants(response.data.applicants);
        setJobTitle(response.data.jobTitle);
      } else {
        console.error("Failed to fetch applicants");
      }
    };

    fetchApplicants();
  }, [jobId]);

  return (
    <div className="p-6">
      <button
        className="text-green-700 mb-4"
        onClick={() => navigate(-1)} // Go back to the previous page
      >
        &larr; Back
      </button>
      <h2 className="text-2xl font-bold text-green-700 mb-6">{jobTitle}</h2>
      {applicants.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-green-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Application Date</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant) => (
              <tr key={applicant.id} className="border-b">
                <td className="py-2 px-4">{applicant.name}</td>
                <td className="py-2 px-4">{applicant.email}</td>
                <td className="py-2 px-4">{applicant.applicationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-red-700">No applicants found for this job.</p>
      )}
    </div>
  );
};

export default JobDetailsPage;
