import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { httpGetWithToken } from "./../../../../utils/http_utils";
import {
  UilBriefcaseAlt,
  UilMapMarker,
  UilCalendarAlt,
  UilBuilding,
} from "@iconscout/react-unicons";

const CandidateAppliedJobs: React.FC = () => {
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const toast = useToast();

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const res = await httpGetWithToken("candidate/applied-jobs");

      if (res.status === "success") {
        setAppliedJobs(res.data);
      } else {
        toast({
          status: "error",
          title: "Failed to fetch applied jobs.",
          description: res.message,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        status: "error",
        title: "Error fetching applied jobs.",
        isClosable: true,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "under review":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (appliedJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-[#FFF5F8] rounded-2xl p-8">
        <UilBriefcaseAlt className="text-gray-300 mb-4" size={80} />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No Applied Jobs Yet
        </h3>
        <p className="text-gray-500 mb-6">
          Start exploring opportunities and apply to jobs that match your
          skills.
        </p>
        <Link
          to="/job-alerts"
          className="bg-[#4ADE80] hover:bg-[#2AA100] text-white font-semibold py-3 px-6 rounded-full transition-all duration-300"
        >
          Browse Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 mt-20 bg-white min-h-screen lg:ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            My Applied Jobs
          </h2>
          <p className="text-gray-600">
            Track your job applications and their status
          </p>
        </div>

        <div className="space-y-4">
          {appliedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Profile Picture */}
                <div className="w-16 h-16 bg-gradient-to-br from-[#4ADE80] to-[#ee009d] rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {job.company?.name?.charAt(0) || "C"}
                </div>

                {/* Job Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-bold text-xl text-gray-800 mb-1">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">
                          {job.company?.name || "Company Name"}
                        </span>
                        <span>•</span>
                        <span>{job.location || "Ikeja"}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                        job.status
                      )}`}
                    >
                      Status: {job.status || "Pending"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <UilCalendarAlt size={16} className="text-gray-400" />
                      <span>
                        Applied: {new Date(job.date_applied).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UilMapMarker size={16} className="text-gray-400" />
                      <span>{job.work_mode || "Remote"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateAppliedJobs;