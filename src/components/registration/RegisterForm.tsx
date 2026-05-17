import React, { useReducer, useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Building2, UserCheck } from 'lucide-react';
import { generateToken, httpPostWithoutToken } from '../../utils/http_utils';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import Images from '../constant/Images';

// Candidate State Interface
interface CandidateState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  showPassword: boolean;
  error: string | null;
  termsAccepted: boolean;
}

// Employer State Interface
interface EmployerState {
  CompanyName: string;
  email: string;
  password: string;
  showPassword: boolean;
  error: string | null;
  termsAccepted: boolean;
}

// Candidate Actions
type CandidateAction =
  | { type: 'SET_FIRST_NAME'; payload: string }
  | { type: 'SET_LAST_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'TOGGLE_SHOW_PASSWORD' }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TERMS_ACCEPTED'; payload: boolean };

// Employer Actions
type EmployerAction =
  | { type: 'SET_COMPANY_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'TOGGLE_SHOW_PASSWORD' }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TERMS_ACCEPTED'; payload: boolean };

// Initial States
const candidateInitialState: CandidateState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  showPassword: false,
  error: null,
  termsAccepted: false,
};

const employerInitialState: EmployerState = {
  CompanyName: '',
  email: '',
  password: '',
  showPassword: false,
  error: null,
  termsAccepted: false,
};

// Reducers
function candidateReducer(state: CandidateState, action: CandidateAction): CandidateState {
  switch (action.type) {
    case 'SET_FIRST_NAME':
      return { ...state, firstName: action.payload };
    case 'SET_LAST_NAME':
      return { ...state, lastName: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'TOGGLE_SHOW_PASSWORD':
      return { ...state, showPassword: !state.showPassword };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_TERMS_ACCEPTED':
      return { ...state, termsAccepted: action.payload };
    default:
      return state;
  }
}

function employerReducer(state: EmployerState, action: EmployerAction): EmployerState {
  switch (action.type) {
    case 'SET_COMPANY_NAME':
      return { ...state, CompanyName: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'TOGGLE_SHOW_PASSWORD':
      return { ...state, showPassword: !state.showPassword };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_TERMS_ACCEPTED':
      return { ...state, termsAccepted: action.payload };
    default:
      return state;
  }
}

const ModernTabSignupForm = () => {
  const [activeTab, setActiveTab] = useState('candidate');
  
  // Candidate form state
  const [candidateState, candidateDispatch] = useReducer(candidateReducer, candidateInitialState);
  const [candidateSubmitting, setCandidateSubmitting] = useState(false);

  // Employer form state
  const [employerState, employerDispatch] = useReducer(employerReducer, employerInitialState);
  const [employerSubmitting, setEmployerSubmitting] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  // Candidate form submission handler
  const handleCandidateSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!candidateState.termsAccepted) {
      candidateDispatch({ type: 'SET_ERROR', payload: 'You must accept the terms and conditions.' });
      return;
    }
    try {
      let data = {
        first_name: candidateState.firstName,
        role: "user",
        last_name: candidateState.lastName,
        email: candidateState.email,
        password: candidateState.password,
      }
      setCandidateSubmitting(true);
      const response = await httpPostWithoutToken("register", data)
      setCandidateSubmitting(false);

      if(response.status === "success") {
        toast({
          status : "success",
          title : "Registration successful!",
          description: "Please check your email to verify your account.",
          isClosable : true,
        });
         // Optional: If backend returns signed URL, navigate directly
      // if(response.data?.verification_url) {
      //   window.location.href = response.data.verification_url;
      // }
      // Otherwise, redirect to login page
      setTimeout(() => navigate("/login"), 1500);
    } else {
      candidateDispatch({ type: 'SET_ERROR', payload: response.message });
    }
  } catch (err) {
    setCandidateSubmitting(false);
    candidateDispatch({ type: 'SET_ERROR', payload: 'An error occurred during registration.' });
    console.error(err);
  }
  };

  // Employer form submission handler
  const handleEmployerSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!employerState.termsAccepted) {
      employerDispatch({ type: 'SET_ERROR', payload: 'You must accept the terms and conditions.' });
      return;
    }
    try {
      let data = {
        name: employerState.CompanyName,
        email: employerState.email,
        password: employerState.password,
        role: "company",
      }
      setEmployerSubmitting(true);
      const response = await httpPostWithoutToken("register", data)
      setEmployerSubmitting(false);

      if(response.status == "success") {
        toast({
          status : "success",
          title : "Registration successful!",
          description: "Please check your email to verify your account.",
          isClosable : true,
        });
        setTimeout(() => navigate("/login"), 1500);
    } else {
      employerDispatch({ type: 'SET_ERROR', payload: response.message });
    }
  } catch (err) {
    setEmployerSubmitting(false);
    employerDispatch({ type: 'SET_ERROR', payload: 'An error occurred during registration.' });
    console.error(err);
    }
  };

  const handleGoogleLogin = () => {
    // Add logic for Google login
  };

  const handleAppleLogin = () => {
    // Add logic for Apple ID login
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[700px]">

          {/* Left Side - Signup Form */}
          <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center">
            <div className='max-w-md mx-auto w-full'>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Welcome to <span className="text-[#ee009d]">Workason</span>
                </h2>
                <p className="text-lg text-gray-600">Create your Account</p>
              </div>

              {/* Tab Navigation */}
              <div className="mb-8">
                <div className="flex bg-gray-100 rounded-2xl p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('candidate')}
                    className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl transition-all duration-200 ${
                      activeTab === 'candidate' 
                        ? 'bg-white shadow-md text-[#ee009d]' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <UserCheck className="h-5 w-5 mr-2" />
                    <span className="font-medium">Candidates</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('employer')}
                    className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl transition-all duration-200 ${
                      activeTab === 'employer' 
                        ? 'bg-white shadow-md text-[#ee009d]' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Building2 className="h-5 w-5 mr-2" />
                    <span className="font-medium">Employers</span>
                  </button>
                </div>
              </div>

              {/* Candidate Form */}
              {activeTab === 'candidate' && (
                <div>
                  {candidateState.error && <p className="text-red-500 text-center mb-4">{candidateState.error}</p>}
                  
                  <div className="space-y-6" onSubmit={handleCandidateSubmit}>
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="First Name"
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                          value={candidateState.firstName}
                          onChange={(e) => candidateDispatch({ type: 'SET_FIRST_NAME', payload: e.target.value })}
                          required
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                          value={candidateState.lastName}
                          onChange={(e) => candidateDispatch({ type: 'SET_LAST_NAME', payload: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                        value={candidateState.email}
                        onChange={(e) => candidateDispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                        required
                      />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={candidateState.showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="w-full pl-12 pr-12 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                        value={candidateState.password}
                        onChange={(e) => candidateDispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => candidateDispatch({ type: 'TOGGLE_SHOW_PASSWORD' })}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {candidateState.showPassword ? 
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : 
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        }
                      </button>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center h-6">
                        <input
                          type="checkbox"
                          checked={candidateState.termsAccepted}
                          onChange={(e) => candidateDispatch({ type: 'SET_TERMS_ACCEPTED', payload: e.target.checked })}
                          className="w-5 h-5 text-[#ee009d] bg-gray-50 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                        />
                      </div>
                      <div className="text-sm">
                        <label className="text-gray-700">
                          I accept the{' '}
                          <a href="/terms" className="text-blue-600 hover:underline font-medium">
                            terms and conditions
                          </a>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        onClick={handleCandidateSubmit}
                        disabled={candidateSubmitting}
                        className={`w-full px-6 py-4 transition-all duration-200 transform hover:scale-[1.02] text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg ${
                          candidateState.termsAccepted || candidateSubmitting 
                            ? 'bg-[#ee009d] hover:bg-[#2AA100]' 
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {candidateSubmitting ? "please wait..." : "Create Account"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Employer Form */}
              {activeTab === 'employer' && (
                <div>
                  {employerState.error && <p className="text-red-500 text-center mb-4">{employerState.error}</p>}
                  
                  <div className="space-y-6" onSubmit={handleEmployerSubmit}>
                    {/* Company Name Field */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Company Name"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                        value={employerState.CompanyName}
                        onChange={(e) => employerDispatch({ type: 'SET_COMPANY_NAME', payload: e.target.value })}
                        required
                      />
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        placeholder="Company Email"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                        value={employerState.email}
                        onChange={(e) => employerDispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                        required
                      />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={employerState.showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="w-full pl-12 pr-12 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                        value={employerState.password}
                        onChange={(e) => employerDispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => employerDispatch({ type: 'TOGGLE_SHOW_PASSWORD' })}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {employerState.showPassword ? 
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : 
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        }
                      </button>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center h-6">
                        <input
                          type="checkbox"
                          checked={employerState.termsAccepted}
                          onChange={(e) => employerDispatch({ type: 'SET_TERMS_ACCEPTED', payload: e.target.checked })}
                          className="w-5 h-5 text-[#ee009d] bg-gray-50 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                        />
                      </div>
                      <div className="text-sm">
                        <label className="text-gray-700">
                          I accept the{' '}
                          <a href="/terms" className="text-blue-600 hover:underline font-medium">
                            terms and conditions
                          </a>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        onClick={handleEmployerSubmit}
                        disabled={employerSubmitting}
                        className={`w-full px-6 py-4 transition-all duration-200 transform hover:scale-[1.02] text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg ${
                          employerState.termsAccepted || employerSubmitting 
                            ? 'bg-[#ee009d] hover:bg-[#2AA100]' 
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {employerSubmitting ? "please wait..." : "Create Account"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="my-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-600 font-medium">Or sign up with</span>
                  </div>
                </div>
              </div>

              {/* Social Signup Buttons */}
              <div className="space-y-4">
                <button 
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-2xl bg-white hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  <span className="text-gray-700 font-medium">Sign up with <strong>Google</strong></span>
                </button>


              </div>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account? 
                  <a href="/login" className="text-blue-600 hover:underline ml-1 font-medium">
                    Sign in
                  </a>
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
              <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-white rounded-full"></div>
              <div className="absolute top-1/4 right-1/3 w-10 h-10 bg-white rounded-full"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-12">
              
              {/* Speech Bubble */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-8 mb-8 relative">
                <div className="absolute -bottom-4 left-12 w-8 h-8 bg-white bg-opacity-20 transform rotate-45"></div>
                <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 leading-tight">
                  {activeTab === 'candidate' 
                    ? "Join thousands of professionals finding their dream jobs!" 
                    : "Connect with top talent and grow your business!"
                  }
                </h2>
                <p className="text-white text-opacity-90">
                  {activeTab === 'candidate' 
                    ? "Create your account and start your career journey" 
                    : "Post jobs and find the perfect candidates"
                  }
                </p>
              </div>

              {/* Character Illustration */}
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-white bg-opacity-10 rounded-full flex items-center justify-center mb-6 relative overflow-hidden">
                    <div className="relative">
                        {activeTab === 'candidate' ? (
                          <img src={Images.LoginImage} alt="login" className="w-full h-full object-cover rounded-full" />
                        ) : (
                          <img src={Images.EmployerRegisterImage} alt="register" className="w-full rounded-[10px]" />
                        )}
                      </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-8 right-8 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>

                <div className="absolute bottom-12 left-8 w-16 h-16 bg-blue-400 bg-opacity-60 rounded-full flex items-center justify-center animate-pulse">
                  {activeTab === 'candidate' ? (
                    <UserCheck className="w-8 h-8 text-white" />
                  ) : (
                    <Building2 className="w-8 h-8 text-white" />
                  )}
                </div>

                {/* <div className="absolute top-1/2 right-4 w-10 h-10 bg-pink-400 bg-opacity-60 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '0.5s'}}>
                  <Mail className="w-5 h-5 text-white" />
                </div> */}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm opacity-80">Jobs Posted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">5K+</div>
                  <div className="text-sm opacity-80">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm opacity-80">Users</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModernTabSignupForm;