import React, { useReducer, useState } from 'react';
import axios from 'axios';
import Images from '../constant/Images';
import { FaGoogle, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { generateToken, httpPostWithoutToken } from '../../utils/http_utils';
import { useToast } from '@chakra-ui/react';

interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  showPassword: boolean;
  error: string | null;
  termsAccepted: boolean;
}

type Action =
  | { type: 'SET_FIRST_NAME'; payload: string }
  | { type: 'SET_LAST_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'TOGGLE_SHOW_PASSWORD' }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TERMS_ACCEPTED'; payload: boolean };

const initialState: State = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  showPassword: false,
  error: null,
  termsAccepted: false,
};

function reducer(state: State, action: Action): State {
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

const CandidateRegisterForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!state.termsAccepted) {
      dispatch({ type: 'SET_ERROR', payload: 'You must accept the terms and conditions.' });
      return;
    }
    try {
      let data = {
        first_name: state.firstName,
        role: "user",
        last_name: state.lastName,
        email: state.email,
        password: state.password,
      }
      setIsSubmitting(true)
      const response = await httpPostWithoutToken("register", data)
      setIsSubmitting(false)

      if(response.status === "success") {
        toast({
          status : "success",
          title : "Registration successful, proceed to login",
          isClosable : true,
        })
        let userEmail = state.email
        setTimeout(() => {
          navigate(`/verify-account?token${generateToken(20)}=&u=${userEmail}`)
        }, 1000);
      }else{

        dispatch({ type: 'SET_ERROR', payload: response.message });
        console.log('Account created:', response.data);
      }
    } catch (err) {
      setIsSubmitting(false)
      dispatch({ type: 'SET_ERROR', payload: 'An error occurred during registration.' });
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
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md xl:max-w-[1300px] lg:max-w-[900px] mx-auto p-8 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2">
          <div>
          <h2 className="text-2xl font-sans font-bold text-center mb-6">
              Welcome to  <Link to='/'><span className="text-[#ee009d]">WeWorkPerHour</span>
              </Link>
            </h2>
          </div>
          <h1 className="text-xl font-sans font-semibold text-center mb-6">Create an Account</h1>
          {state.error && <p className="text-red-500 text-center mb-4">{state.error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-6 py-2 mt-2 border-b-[1.5px] focus:outline-none focus:ring-2 focus:ring-[#2aa100]"
                  value={state.firstName}
                  onChange={(e) => dispatch({ type: 'SET_FIRST_NAME', payload: e.target.value })}
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-6 py-2 mt-2 border-b-[1.5px] focus:outline-none focus:ring-2 focus:ring-[#2aa100]"
                  value={state.lastName}
                  onChange={(e) => dispatch({ type: 'SET_LAST_NAME', payload: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-6 py-2 mt-2 border-b-[1.5px] focus:outline-none focus:ring-2 focus:ring-[#2aa100]"
                value={state.email}
                onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type={state.showPassword ? 'text' : 'password'}
                id="password"
                className="w-full px-6 py-2 mt-2 border-b-[1.5px] focus:outline-none focus:ring-2 focus:ring-[#2aa100]"
                value={state.password}
                onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => dispatch({ type: 'TOGGLE_SHOW_PASSWORD' })}
                className="absolute right-2 top-10 transform -translate-y-1/2"
              >
                {state.showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={state.termsAccepted}
                onChange={(e) => dispatch({ type: 'SET_TERMS_ACCEPTED', payload: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I accept the <a href="/terms" className="text-blue-600 hover:underline">terms and conditions</a>
              </label>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${state.termsAccepted || isSubmitting ? 'bg-[#ee009d] hover:bg-[#2AA100]' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                {isSubmitting ? "please wait..." : "Create Account"}
              </button>
            </div>
          </form>
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={handleGoogleLogin}
              className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700"
            >
              <FaGoogle />
            </button>
            <button
              onClick={handleAppleLogin}
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800"
            >
              <FaApple />
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link></p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:ml-8">
          <img src={Images.LoginImage} alt="register" className="w-full h-full rounded-[10px]" />
        </div>
      </div>
    </section>
  );
};

export default CandidateRegisterForm;
