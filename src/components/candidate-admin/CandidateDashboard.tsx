import React, { useEffect, useState, useContext } from "react";
import {
  User,
  Bookmark,
  Eye,
  FileText,
  TrendingUp,
  Calendar,
  MoreVertical,
  MapPin,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { httpGetWithToken } from "../../utils/http_utils";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../global/state";
import { useCMS } from "../../hooks/useCMS";

/* ---------------------------
   Types
   --------------------------- */
type Company = {
  id?: number;
  name?: string;
};

type AppliedJob = {
  id: number;
  title?: string;
  slug?: string;
  company?: Company;
  location?: string;
  date_applied: string;
  status?: string;
};

type StatusData = {
  name: string;
  value: number;
};

type StatCard = {
  title: string;
  value: number | string;
  change?: string;
  trend?: "up" | "down" | "";
  color?: string;
  icon?: React.ReactNode;
};

/* ---------------------------
   Profile Setup Modal
   --------------------------- */
interface ProfileSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  heading: string;
  description: string;
  ctaLabel: string;
  skipLabel: string;
}

const ProfileSetupModal: React.FC<ProfileSetupModalProps> = ({
  isOpen,
  onClose,
  heading,
  description,
  ctaLabel,
  skipLabel,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center animate-fade-in">
        {/* Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <User size={40} className="text-green-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {heading}
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              navigate("/profile-list");
              onClose();
            }}
            className="bg-green-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            {ctaLabel}
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-600 py-3 px-8 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            {skipLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------
   Component
   --------------------------- */
const CandidateDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user }: any = useContext(AppContext);
  const { candidateDashboard } = useCMS();

  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<"week" | "month">("week");
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  // Check if profile is incomplete and show modal
  useEffect(() => {
    if (user) {
      const isIncomplete = !user.bio || !user.avatar || !user.name;
      if (isIncomplete) {
        setShowProfileModal(true);
      }
    }
  }, [user]);

  // Fetch applied jobs for this candidate
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const res = await httpGetWithToken("candidate/applied-jobs");
        if (res && res.status === "success" && Array.isArray(res.data)) {
          setAppliedJobs(res.data as AppliedJob[]);
        } else if (res && res.data && Array.isArray(res.data)) {
          setAppliedJobs(res.data as AppliedJob[]);
        } else {
          setAppliedJobs([]);
        }
      } catch (err) {
        console.error("Failed to fetch applied jobs:", err);
        setAppliedJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  /* ---------------------------
     Derived metrics & chart data
     --------------------------- */
  const totalApplications = appliedJobs.length;

  const weekdayShorts = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const applicationData = weekdayShorts.map((dayShort) => {
    const count = appliedJobs.filter((job) => {
      if (!job.date_applied) return false;
      const d = new Date(job.date_applied);
      if (isNaN(d.getTime())) return false;
      const wk = d.toLocaleDateString("en-US", { weekday: "short" });
      return wk === dayShort;
    }).length;

    return { day: dayShort, applications: count };
  });

  const statusCounts = appliedJobs.reduce<Record<string, number>>((acc, job) => {
    const status = (job.status || "Pending").toString();
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const applicationStatusData: StatusData[] = Object.keys(statusCounts).map(
    (status) => ({
      name: status,
      value: statusCounts[status],
    })
  );

  const stats: StatCard[] = [
    {
      title: candidateDashboard.applied_jobs_label,
      value: totalApplications,
      change: "",
      trend: "",
      color: "from-purple-500 to-pink-500",
      icon: <FileText size={24} />,
    },
    {
      title: candidateDashboard.profile_strength_label,
      value: "—",
      change: "+28 today",
      trend: "up",
      color: "from-emerald-500 to-teal-500",
      icon: <Eye size={24} />,
    },
    {
      title: candidateDashboard.saved_jobs_label,
      value: "—",
      change: "+3 new matches",
      trend: "up",
      color: "from-blue-500 to-cyan-500",
      icon: <Bookmark size={24} />,
    },
    {
      title: candidateDashboard.job_engagements_label,
      value: "—",
      change: "+2 pending",
      trend: "up",
      color: "from-amber-500 to-orange-500",
      icon: <User size={24} />,
    },
  ];

  const COLORS = ["#8B5CF6", "#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8 mt-20 lg:ml-64">
      {/* Profile Setup Modal */}
      <ProfileSetupModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        heading={candidateDashboard.profile_modal_heading}
        description={candidateDashboard.profile_modal_description}
        ctaLabel={candidateDashboard.profile_modal_cta}
        skipLabel={candidateDashboard.profile_modal_skip}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                {candidateDashboard.welcome_text}, {user?.name ?? "Candidate"}!
              </h1>
              <p className="text-slate-600 flex items-center gap-2">
                <Calendar className="text-blue-500" size={18} />
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {stat.icon}
                </div>
                <span className="text-emerald-500 text-sm font-semibold flex items-center gap-1">
                  <TrendingUp size={16} /> {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-slate-600 font-medium">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                {candidateDashboard.app_activity_heading}
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTimeRange("week")}
                  className={`px-3 py-1 rounded ${
                    timeRange === "week"
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-400"
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setTimeRange("month")}
                  className={`px-3 py-1 rounded ${
                    timeRange === "month"
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-400"
                  }`}
                >
                  Month
                </button>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical size={24} />
                </button>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={applicationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              {candidateDashboard.app_status_heading}
            </h2>

            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={(entry) => `${entry.name} (${entry.value})`}
                >
                  {applicationStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 space-y-2">
              {applicationStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Grid */}

      </div>
    </div>
  );
};

export default CandidateDashboard;