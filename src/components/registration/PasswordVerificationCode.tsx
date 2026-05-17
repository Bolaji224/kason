import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { httpPostWithoutToken, validateEmail } from "../../utils/http_utils";
import { useToast } from "@chakra-ui/react";
import Images from "../constant/Images";
import { AppContext } from "../../global/state";

interface PassVerificationCodeProps {
  length: number;
  onSubmit: (code: string) => void;
}

const PasswordVerificationCode: React.FC<PassVerificationCodeProps> = ({ length, onSubmit }) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);

  const location = useLocation();
  const search = location.search;
  const navigate = useNavigate();
  const toast = useToast();
  useContext(AppContext);

  useEffect(() => {
    const queryEmail = new URLSearchParams(search).get("email");
    if (!queryEmail || !validateEmail(queryEmail)) {
      navigate("/login");
    } else {
      setEmail(queryEmail);
    }
  }, [search, navigate]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (index < length - 1) {
        (document.getElementById(`code-${index + 1}`) as HTMLInputElement)?.focus();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && code[index] === "") {
      (document.getElementById(`code-${index - 1}`) as HTMLInputElement)?.focus();
    }
  };

  const handleSubmit = async () => {
    const codeString = code.join("");
    if (codeString.length !== length) {
      setError("Please enter the full verification code.");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await httpPostWithoutToken("verify-token", { email, token: codeString });
      setIsSubmitting(false);

      if (response.status === "success") {
        setIsVerified(true);
        toast({
          status: "success",
          title: "Code Verified",
          description: "You can now reset your password.",
          isClosable: true,
          duration: 4000,
        });
      } else {
        setError(response.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      setIsSubmitting(false);
      setError("An error occurred during verification. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    const codeString = code.join(""); // Define codeString here

    if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      setError("Password fields cannot be empty.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await httpPostWithoutToken("reset-password", {
        email,
        password: newPassword,
        token: codeString,
        password_confirmation: newPassword,
      });

      setIsSubmitting(false);

      if (response.status === "success") {
        toast({
          status: "success",
          title: "Password Reset Successful",
          description: "You can now log in with your new password.",
          isClosable: true,
          duration: 4000,
        });
        navigate("/login");
      } else {
        setError(response.message || "Password reset failed. Please try again.");
      }
    } catch (error) {
      setIsSubmitting(false);
      setError("An error occurred during password reset. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);

    try {
      const response = await httpPostWithoutToken("resend-otp", { email });
      setIsResending(false);

      if (response.status === "success") {
        toast({
          status: "success",
          title: "OTP Resent",
          description: `A new OTP has been sent to ${email}.`,
          isClosable: true,
          duration: 4000,
        });
      } else {
        setError(response.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setIsResending(false);
      setError("An error occurred during OTP resend. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md xl:max-w-[1300px] lg:max-w-[900px] mx-auto flex flex-col lg:flex-row items-center">
        {!isVerified ? (
          <div className="w-full lg:w-1/2 p-20">
            <h1 className="text-2xl font-semibold mb-6">Enter Verification Code</h1>
            <p className="mb-4">
              A verification code has been sent to: <strong>{email}</strong>
            </p>
            <div className="flex gap-4 mb-4">
              {code.map((value, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-xl"
                  value={value}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyPress(e, index)}
                />
              ))}
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              className={`bg-[#ee009d] text-white px-6 py-2 rounded font-medium hover:bg-[#2aa100] transition-transform ease-in-out duration-300 hover:scale-110 ${isSubmitting ? "opacity-50" : ""}`}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <p className="mt-4 text-sm">
              Didn't receive it?{" "}
              <button
                className="text-blue-600 hover:underline"
                onClick={handleResendOTP}
                disabled={isResending}
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </button>
            </p>
          </div>
        ) : (
          <div className="w-full lg:w-1/2 p-20">
            <h1 className="text-2xl font-semibold mb-6">Reset Your Password</h1>
            <p className="mb-4">Please enter your new password.</p>
            <div className="flex flex-col gap-4 mb-4">
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-lg"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              className={`bg-[#ee009d] text-white px-6 py-2 rounded font-medium hover:bg-[#2aa100] transition-transform ease-in-out duration-300 hover:scale-110 ${isSubmitting ? "opacity-50" : ""}`}
              onClick={handlePasswordReset}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Reset Password"}
            </button>
          </div>
        )}
        <div className="w-full lg:w-1/2">
          <img src={Images.LoginImage} alt="login" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default PasswordVerificationCode;
