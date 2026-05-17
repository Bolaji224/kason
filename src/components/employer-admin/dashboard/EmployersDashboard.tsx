import React, { useEffect, useState } from 'react';
import { User, Briefcase, TrendingUp, Eye, Calendar, MoreVertical, ChartLine } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { httpGetWithToken } from '../../../utils/http_utils';

const EmployersDashboard = () => {
  const [loading, setLoading] = useState(true);

  // Stats data
  const [stats, setStats] = useState({
    active_jobs: 0,
    new_applicants: 0,
    profile_views: 0,
    engagement_rate: 0,
  });

  const [trend, setTrend] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await httpGetWithToken("employer/dashboard-stats");

      setStats({
        active_jobs: res.active_jobs,
        new_applicants: res.new_applicants,
        profile_views: res.profile_views,
        engagement_rate: res.engagement_rate,
      });

      setTrend(res.data.applicant_trend || []);
      setSources(res.data.applicant_sources || []);
    }catch (error) {
      console.error("Error loading dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  // Chart data
  const statsCards = [
    {
      title: "Active Jobs",
      value: stats.active_jobs,
      change: "+ Updated",
      color: "from-purple-500 to-pink-500",
      icon: <Briefcase size={24} />,
    },
    {
      title: "New Applicants",
      value: stats.new_applicants,
      change: "+ Today",
      color: "from-emerald-500 to-teal-500",
      icon: <User size={24} />,
    },
    {
      title: "Profile Views",
      value: stats.profile_views,
      change: "Updated",
      color: "from-blue-500 to-cyan-500",
      icon: <Eye size={24} />,
    },
    {
      title: "Engagement Rate",
      value: stats.engagement_rate + "%",
      change: "Based on activity",
      color: "from-amber-500 to-orange-500",
      icon: <ChartLine size={24} />,
    },
  ];

  const applicantsData = [
    { day: 'Mon', applicants: 12 },
    { day: 'Tue', applicants: 19 },
    { day: 'Wed', applicants: 8 },
    { day: 'Thu', applicants: 15 },
    { day: 'Fri', applicants: 23 },
    { day: 'Sat', applicants: 7 },
    { day: 'Sun', applicants: 11 },
  ];

  const jobPerformanceData = [
    { name: 'Senior Dev', views: 145, applications: 23 },
    { name: 'UX Designer', views: 132, applications: 18 },
    { name: 'Product Mgr', views: 98, applications: 15 },
    { name: 'Data Analyst', views: 87, applications: 12 },
  ];

  const applicantSourceData = [
    { name: 'Direct Apply', value: 45 },
    { name: 'Instagram', value: 30 },
    { name: 'Job Boards', value: 15 },
    { name: 'Referrals', value: 10 },
  ];

  const COLORS = ['#8B5CF6', '#10B981', '#3B82F6', '#F59E0B'];

  // Recent activities
  const recentActivities = [
    {
      action: "New application received",
      job: "Senior Frontend Developer",
      candidate: "Sarah Johnson",
      time: "5 min ago",
      avatar: "SJ"
    },
    {
      action: "Job posting viewed",
      job: "UX/UI Designer",
      candidate: "42 views",
      time: "1 hour ago",
      avatar: "👁️"
    },
    {
      action: "Application shortlisted",
      job: "Product Manager",
      candidate: "Michael Chen",
      time: "2 hours ago",
      avatar: "MC"
    },
    {
      action: "Interview scheduled",
      job: "Data Analyst",
      candidate: "Emma Wilson",
      time: "4 hours ago",
      avatar: "EW"
    },
  ];

  const topJobs = [
    { title: "Senior Frontend Developer", applicants: 23, views: 145, status: "active" },
    { title: "UX/UI Designer", applicants: 18, views: 132, status: "active" },
    { title: "Product Manager", applicants: 15, views: 98, status: "active" },
    { title: "Data Analyst", applicants: 12, views: 87, status: "paused" },
  ];

   return (
    <div className=" lg:ml-64 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto mt-20">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                Employer Dashboard
              </h1>
              <p className="text-slate-600 flex items-center gap-2">
                <Calendar className="text-blue-500" size={18} />
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <span className="text-emerald-500 text-sm font-semibold flex items-center gap-1">
                  <TrendingUp size={16} /> {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-slate-600 font-medium">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Applicants Trend */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Applicant Trends</h2>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreVertical size={24} />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={applicantsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="applicants" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Applicant Sources */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Applicant Sources</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={applicantSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {applicantSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {applicantSourceData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                    <span className="text-sm text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

     

      </div>
    </div>
  );
};

export default EmployersDashboard;