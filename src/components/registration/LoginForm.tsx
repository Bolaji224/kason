import React, { useContext, useReducer, useState } from "react";
import Images from "../constant/Images";
import { FaGoogle, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { httpPostWithoutToken } from "../../utils/http_utils";
import { useToast } from "@chakra-ui/react";
import ls from "localstorage-slim";
import { AppContext } from "../../global/state";
import { Lock, User } from "lucide-react";
import { useGoogleLogin } from '@react-oauth/google';


// -----------------------------
// State & Reducer
// -----------------------------
interface State {
  email: string;
  password: string;
  showPassword: boolean;
  error: string | null;
}

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "TOGGLE_SHOW_PASSWORD" }
  | { type: "SET_ERROR"; payload: string | null };

const initialState: State = {
  email: "",
  password: "",
  showPassword: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "TOGGLE_SHOW_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// -----------------------------
// Component
// -----------------------------
const LoginForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { updateUser }: any = useContext(AppContext);

  // Google Login Handler
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google token received:", tokenResponse);
      
      try {
        // Get user info from Google
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        
        const userInfo = await userInfoResponse.json();
        console.log("Google user info:", userInfo);
        
        // Send to your backend for authentication
        const response = await httpPostWithoutToken("auth/google", {
          email: userInfo.email,
          name: userInfo.name,
          google_id: userInfo.sub,
          picture: userInfo.picture,
        });
        
        const data = response.data || response;
        console.log("Backend response:", data);
        
        if (data.status === "success") {
          toast({
            status: "success",
            title: "Login successful!",
            isClosable: true,
          });
          
          // Save token and user (same as regular login)
          sessionStorage.setItem("wwph_token", data.access_token);
          sessionStorage.setItem("wwph_usr", JSON.stringify(data.user));
          ls.set("wwph_token", data.access_token, { encrypt: true });
          ls.set("wwph_usr", data.user, { encrypt: true });
          localStorage.setItem("userId", data.user.id.toString());
          localStorage.setItem("email", data.user.email);
          
          updateUser(data.user);
          
          const role = Number(data.user.role);
          setTimeout(() => {
            if (role === 2) {
              navigate(data.user.about_company ? "/employers-dashboard" : "/submit-jobs");
            } else if (role === 1) {
              navigate("/candidate-dashboard");
            } else {
              navigate("/");
            }
          }, 1000);
        } else {
          toast({
            status: "error",
            title: data.message || "Google login failed",
            isClosable: true,
          });
        }
      } catch (error: any) {
        console.error("Google login error:", error);
        toast({
          status: "error",
          title: error.response?.data?.message || "Google login failed",
          isClosable: true,
        });
      }
    },
    onError: (error) => {
      console.error("Google OAuth error:", error);
      toast({
        status: "error",
        title: "Google login failed",
        isClosable: true,
      });
    },
  });

  // -----------------------------
  // Handle Login Submit
  // -----------------------------
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      email: state.email,
      password: state.password,
    };
    setIsSubmitting(true);

    try {
      // LOGIN: No token needed
      const response = await httpPostWithoutToken("login", payload);
      const data = response.data || response;

      if (data.status === "success") {
        toast({
          status: "success",
          title: "Login successful!",
          isClosable: true,
        });

        // Save token and user
        sessionStorage.setItem("wwph_token", data.access_token);
        sessionStorage.setItem("wwph_usr", JSON.stringify(data.user));
        ls.set("wwph_token", data.access_token, { encrypt: true });
        ls.set("wwph_usr", data.user, { encrypt: true });

        localStorage.setItem("userId", data.user.id.toString());
        localStorage.setItem("email", data.user.email);

        updateUser(data.user);

        const role = Number(data.user.role);

        setTimeout(() => {
          if (role === 2) {
            if (!data.user.about_company) navigate("/submit-jobs");
            else navigate("/employers-dashboard");
          } else if (role === 1) {
            navigate("/candidate-dashboard");
          } else {
            navigate("/");
          }
        }, 1000);
      } else {
        dispatch({ type: "SET_ERROR", payload: data.message || "Login failed" });
        toast({
          status: "error",
          title: data.message || "Login failed",
          isClosable: true,
        });
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const msg = err.response?.data?.message || err.message || "Login failed";
      dispatch({ type: "SET_ERROR", payload: msg });
      toast({
        status: "error",
        title: msg,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // -----------------------------
  // Social logins
  // -----------------------------
   const handleGoogleLogin = () => {
    googleLogin();
  };

  const handleAppleLogin = () => {
    // Add logic for Apple ID login
  };

  // -----------------------------
  // Render Form
  // -----------------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side - Login Form */}
          <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Welcome to{" "}
                  <Link to="/">
                    <span className="text-[#ee009d]">Workason</span>
                  </Link>
                </h2>
                <p className="text-lg text-gray-600">Sign in to your Account</p>
              </div>

              {/* Login Form */}
              {state.error && (
                <p className="text-red-500 text-center mb-4">{state.error}</p>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                    value={state.email}
                    onChange={(e) =>
                      dispatch({ type: "SET_EMAIL", payload: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={state.showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                    value={state.password}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_PASSWORD",
                        payload: e.target.value,
                      })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "TOGGLE_SHOW_PASSWORD" })}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {state.showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-between items-center">
                  <Link to="/forget-password">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </Link>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full px-6 py-4 transition-all duration-200 transform hover:scale-[1.02] text-white bg-[#ee009d] rounded-2xl hover:bg-[#2AA100] focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Sign In"}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="my-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-600 font-medium">
                      Login with Others
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-2xl bg-white hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">
                    Login with <strong>Google</strong>
                  </span>
                </button>

              </div>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?
                  <Link
                    to="/register"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="flex-1 bg-gradient-to-br from-purple-500 to-purple-700 relative overflow-hidden lg:flex items-center justify-center hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute top-32 right-16 w-16 h-16 bg-white rounded-full"></div>
              <div className="absolute bottom-20 left-20 w-12 h-12 bg-white rounded-full"></div>
              <div className="absolute bottom-40 right-32 w-8 h-8 bg-white rounded-full"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-12">
              {/* Speech Bubble */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-8 mb-8 relative">
                <div className="absolute -bottom-4 left-12 w-8 h-8 bg-white bg-opacity-20 transform rotate-45"></div>
                <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 leading-tight">
                  Awesome, Login and get started !!!
                </h2>
              </div>

              {/* Character Illustration */}
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-white bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                  <img
                    src={Images.LoginImage}
                    alt="login"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Floating Star */}
                <div className="absolute top-8 right-8 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
