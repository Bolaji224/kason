import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { httpPostWithoutToken } from "../../../../utils/http_utils";
import { useToast } from "@chakra-ui/react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({ status: "error", title: "Please fill in all fields", isClosable: true });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ status: "error", title: "Please enter a valid email address", isClosable: true });
      return;
    }

    setIsSubmitting(true);
    const response = await httpPostWithoutToken("contact", formData);
    setIsSubmitting(false);

    if (response.status === "success") {
      toast({
        status: "success",
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
        isClosable: true,
        duration: 6000,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      toast({
        status: "error",
        title: response.message || "Something went wrong. Please try again.",
        isClosable: true,
      });
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 mt-28"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Hero Section */}
      <motion.div
        className="bg-[#023020] text-white py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#023020]/50 px-4 py-2 rounded-full text-sm mb-6">
            <span className="text-lg">✉️</span>
            <span>We'd love to hear from you</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-teal-100 text-lg max-w-2xl mx-auto">
            Have a question or want to work together? Drop us a message and we'll get back to you as soon as possible.
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact Information</h2>
            <p className="text-gray-600 mb-8">
              Reach out through any of these channels and we'll respond promptly.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="text-gray-900 font-medium">contact@workason.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="text-gray-900 font-medium">+447344616797</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Address</p>
                  <p className="text-gray-900 font-medium">
                    Office 123, Unit 5<br />
                    399-405 Oxford Street, Mayfair<br />
                    London W1C 2BU
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Hours</p>
                  <p className="text-gray-900 font-medium">Mon - Sat: 9 AM - 6 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023020]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#023020]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#023020]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#023020]"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-[#023020] hover:bg-[#023020]/90 text-white font-medium py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}