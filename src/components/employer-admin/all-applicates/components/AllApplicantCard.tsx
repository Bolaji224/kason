import React from 'react';
import { UilCheck, UilEye, UilTimes, UilEnvelopeCheck } from '@iconscout/react-unicons';

interface ApplicantCardProps {
  name: string;
  role: string;
  location: string;
  rate: number;
  profileImage: string;
  skills: string[];
  onDelete: () => void;
  onApprove: () => void;
  onReject: () => void;
  onView: () => void;
  onMessage: () => void;
  status?: string;
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({
  name,
  role,
  location,
  rate,
  skills,
  profileImage,
  onApprove,
  onReject,
  onView,
  onMessage,
  status,
}) => {
  const normalizedStatus = (status || '').toLowerCase();

  const ActionButton = ({
    onClick,
    Icon,
    title,
    bgColor,
    hoverColor,
    textColor,
  }: {
    onClick: () => void;
    Icon: React.ElementType;
    title: string;
    bgColor: string;
    hoverColor: string;
    textColor: string;
  }) => (
    <button
      onClick={onClick}
      className={`p-[6px] ${bgColor} ${hoverColor} ${textColor} rounded-full transition-all`}
      title={title}
    >
      <Icon size={16} />
    </button>
  );

  const renderStatusBadge = () => {
    if (normalizedStatus === 'approved') {
      return (
        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          <UilCheck size={14} /> Approved
        </span>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col sm:flex-row items-start gap-4 relative">
      {/* Profile Image */}
      <img
        src={profileImage}
        alt={`${name}'s profile`}
        className="w-16 h-16 rounded-full object-cover border border-gray-300"
      />

      {/* Candidate Info */}
      <div className="flex-1 w-full">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{name}</h3>
            <p className="text-gray-600 text-sm">{role}</p>
            <p className="text-gray-500 text-sm">{location}</p>
            <p className="mt-2 text-gray-800 font-medium">${rate}</p>
          </div>

          {/* Status Badge */}
          {renderStatusBadge()}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-[#F5E2EF] text-[#2aa100] rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4 justify-end flex-wrap">
          <ActionButton
            onClick={onView}
            Icon={UilEye}
            title="View"
            bgColor="bg-[#F5E2EF]"
            hoverColor="hover:bg-green-200"
            textColor="text-[#2aa100]"
          />

          {normalizedStatus !== 'approved' && (
            <>
              <ActionButton
                onClick={onApprove}
                Icon={UilCheck}
                title="Approve"
                bgColor="bg-[#E8F5E9]"
                hoverColor="hover:bg-green-200"
                textColor="text-green-700"
              />
              <ActionButton
                onClick={onReject}
                Icon={UilTimes}
                title="Reject"
                bgColor="bg-[#FFEBEE]"
                hoverColor="hover:bg-red-200"
                textColor="text-red-600"
              />
            </>
          )}

          <ActionButton
            onClick={onMessage}
            Icon={UilEnvelopeCheck}
            title="Message"
            bgColor="bg-[#E3F2FD]"
            hoverColor="hover:bg-blue-200"
            textColor="text-blue-700"
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicantCard;
