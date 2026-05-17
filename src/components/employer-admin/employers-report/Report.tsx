import React, { useState } from "react";
import axios from "axios";
import {
  AlertCircle,
  CheckCircle,
  Upload,
  X,
  FileText,
} from "lucide-react";

type FormDataType = {
  fullName: string;
  email: string;
  phone: string;
  candidateName: string;
  disputeCategory: string;
  subject: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  attachments: File[];
};

const priorityColors: Record<string, string> = {
  low: "bg-green-500 text-white border-transparent",
  medium: "bg-blue-500 text-white border-transparent",
  high: "bg-yellow-500 text-white border-transparent",
  urgent: "bg-red-500 text-white border-transparent",
};

const DisputeResolutions: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    email: "",
    phone: "",
    candidateName: "",
    disputeCategory: "",
    subject: "",
    description: "",
    priority: "medium",
    attachments: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const disputeCategories = [
    "Contract Breach",
    "Performance Issues",
    "Misconduct",
    "Attendance Problems",
    "Background Check Discrepancy",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      candidateName: "",
      disputeCategory: "",
      subject: "",
      description: "",
      priority: "medium",
      attachments: [],
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.candidateName.trim())
      newErrors.candidateName = "Candidate name or username is required";
    if (!formData.disputeCategory)
      newErrors.disputeCategory = "Please select a category";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    else if (formData.description.trim().length < 50)
      newErrors.description = "Please provide at least 50 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("user_type", "employer");
      payload.append("full_name", formData.fullName);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("candidate_name", formData.candidateName);
      payload.append("dispute_category", formData.disputeCategory);
      payload.append("subject", formData.subject);
      payload.append("description", formData.description);
      payload.append("priority", formData.priority);
      formData.attachments.forEach((file) =>
        payload.append("attachments[]", file)
      );

      const BASE_URL =
        import.meta.env.VITE_API_URL?.replace("/api/v1", "") ||
        "https://api.workason.site";

      await axios.post(`${BASE_URL}/api/v1/dispute/submit`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSubmitted(true);
      resetForm();
    } catch (err: any) {
      console.error("Submission error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message || err.message || "Failed to submit dispute"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-12 text-center max-w-lg">
          <div className="w-24 h-24 mx-auto bg-green-600 rounded-full flex items-center justify-center text-white mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-3">Dispute Submitted Successfully</h2>
          <p className="text-gray-600 mb-4">
            Your report has been sent to our admin team. We'll review your case
            and contact you within 24-48 hours.
          </p>
          <div className="inline-block bg-gray-100 px-6 py-3 rounded-lg font-mono font-semibold">
            Reference #: DR-{Date.now().toString().slice(-8)}
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 block w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Submit Another Dispute
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:ml-64 p-8 min-h-screen bg-gray-50 py-[8rem]">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <div className="w-16 h-1 bg-green-600 mx-auto rounded mb-4"></div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dispute Resolution Center
          </h1>
          <p className="text-gray-500 text-lg">
            Professional mediation for workplace conflicts and contractual disputes
          </p>
        </header>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="border-b border-gray-100 pb-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Submit Your Dispute
            </h2>
            <p className="text-gray-500 text-sm">
              All information is confidential and will be reviewed by our admin team
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Full Name */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <span className="text-red-500 text-sm">{errors.fullName}</span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">{errors.phone}</span>
                )}
              </div>

              {/* Candidate Name */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Candidate Username / Full Name *
                </label>
                <input
                  type="text"
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.candidateName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter the candidate's name or username"
                />
                {errors.candidateName && (
                  <span className="text-red-500 text-sm">{errors.candidateName}</span>
                )}
              </div>

              {/* Dispute Category */}
              <div className="md:col-span-2">
                <label className="block font-semibold text-gray-700 mb-1">
                  Dispute Category *
                </label>
                <select
                  name="disputeCategory"
                  value={formData.disputeCategory}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.disputeCategory ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a category</option>
                  {disputeCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.disputeCategory && (
                  <span className="text-red-500 text-sm">{errors.disputeCategory}</span>
                )}
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Priority Level
              </label>
              <div className="flex gap-3 flex-wrap">
                {(["low", "medium", "high", "urgent"] as const).map((level) => (
                  <label key={level} className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      value={level}
                      checked={formData.priority === level}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span
                      className={`block text-center py-2 rounded-lg border font-semibold transition ${
                        formData.priority === level
                          ? priorityColors[level]
                          : "border-gray-300 text-gray-600"
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Brief summary of your dispute"
              />
              {errors.subject && (
                <span className="text-red-500 text-sm">{errors.subject}</span>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Detailed Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Provide a detailed description (minimum 50 characters)"
              />
              <div className="text-right text-gray-400 text-sm mt-1">
                {formData.description.length} characters
                {formData.description.length < 50 &&
                  formData.description.length > 0 && (
                    <span className="text-red-400 ml-2">
                      ({50 - formData.description.length} more needed)
                    </span>
                  )}
              </div>
              {errors.description && (
                <span className="text-red-500 text-sm">{errors.description}</span>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Supporting Documents
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 hover:bg-green-50 transition">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fileUpload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="fileUpload"
                  className="inline-flex items-center gap-2 cursor-pointer text-green-600 font-semibold"
                >
                  <Upload size={20} /> Upload Files
                </label>
                <p className="text-gray-400 text-sm mt-1">
                  PDF, DOC, DOCX, JPG, PNG
                </p>
              </div>
              {formData.attachments.length > 0 && (
                <div className="mt-3 space-y-2">
                  {formData.attachments.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-gray-100 rounded-lg p-2 text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <FileText size={16} className="text-green-600" />
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="flex gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-800 text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              By submitting this dispute, you confirm all information is accurate.
              False reports may result in account suspension.
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  Processing...
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
                </>
              ) : (
                "Submit Dispute Report"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DisputeResolutions;