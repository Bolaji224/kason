import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpPostWithoutToken } from "../../utils/http_utils";
import { useToast } from "@chakra-ui/react";
import Images from "../constant/Images";

// Define the State interface for the Forget Password form
interface ForgetPasswordProps {}

const ForgetPassword: React.FC<ForgetPasswordProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await httpPostWithoutToken("forgot-password", { email });
      setIsSubmitting(false);

      // Check if response and status are correctly defined
      if (response && response.status === "success") {
        toast({
          title: "Password Reset Code Sent",
          description: `A reset code has been sent to ${email}. Please check your email.`,
          status: "success",
          isClosable: true,
          position: "top-right",
        });
        // Navigate to the verification page with email in the query parameters
        navigate(`/verification-code?email=${email}`);
      } else {
        setError(response?.message || "Failed to send verification email. Please try again.");
      }
    } catch (err) {
      setIsSubmitting(false);
      setError("An error occurred. Please try again.");
      console.error("Error:", err); // Log error for debugging
      
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md xl:max-w-[1300px] lg:max-w-[900px] mx-auto gap-2 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 p-20">
          <h1 className="text-2xl font-semibold mb-6">Forgot Password</h1>
          <p className="mb-4">Please enter your email address to receive a verification code.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border-b-[1.5px] focus:outline-none focus:ring-1 focus:ring-[#2aa100]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="bg-[#ee009d] text-white px-6 py-2 rounded-[2px] font-sans font-medium hover:bg-[#2aa100] transition-transform ease-in-out duration-300 hover:scale-110"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Reset Password"}
            </button>
          </form>
        </div>
        <div className="w-full lg:w-1/2">
          <img src={Images.LoginImage} alt="login" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
