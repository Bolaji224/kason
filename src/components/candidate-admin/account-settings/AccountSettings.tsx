import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../global/state';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { httpGetWithToken, httpPostWithToken } from '../../../utils/http_utils';
import ls from "localstorage-slim";

const AdminAccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const {updateUser}:any = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const toast = useToast();
  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handlers for form submissions
  const handleAccountInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(loading) return;
    setLoading(true)
    const fd = {
      name : lastName,
      phone_no : phoneNumber,
    }
    const resp = await httpPostWithToken("profile", fd)
    if(resp.status == "success") {
      getProfile()

      toast({
        status : "success",
        title : "Profile updated",
        isClosable : true,
        duration : 5000
      })
    }
    setLoading(false)
  };

  const getProfile = async () => {
    const res = await httpGetWithToken("profile");
    setLastName(res.data.name)
    updateUser(res.data)
    setPhoneNumber(res.data.phone_no)
  }

  useEffect(()=> {
    getProfile();
  }, [])

  const handleChangePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(loading) return;
    setLoading(true)
    const fd = {
      password : newPassword,
      password_confirmation : confirmPassword,
      current_password : oldPassword
    }
    const resp = await httpPostWithToken("user/change-password", fd)
    if(resp.status == "success") {
      toast({
        status : "success",
        title : "Password updated",
        isClosable : true,
        duration : 5000
      })
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }else {
      toast({
        status : "error",
        title : resp.error,
        isClosable : true,
        duration : 5000
      })
    }
    setLoading(false)

    
  };
  
  return (
    <div className="ml-64 max-w-[1100px] mx-auto py-16 mt-[4rem] ">
      <h1 className="text-green-700 text-2xl sm:text-3xl md:text-4xl  mb-4 font-poppins font-semibold">Account Settings</h1>

      {/* Account Information Section */}
      <form onSubmit={handleAccountInfoSubmit} className="space-y-4">
       <section className="bg-white rounded-2xl py-16 px-[3rem] mt-8">
       <h2 className="text-[#EE009D] text-[18px] sm:text-xl md:text-xl font-poppins font-semibold">Edit & Update</h2>
       <section className='py-8'>
       <div className="grid grid-cols-1 gap-x-4 mb-4">
          
          <div>
            <label htmlFor="lastName" className="block mb-2  font-semibold font-sans text-[#2aa100] text-[16px]">Full Name</label>
            <input
              type="text"
              id="lastName"
              placeholder='Full name....'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-none sm:text-sm"
              required
            />
          </div>
        </div>
        {/* <label htmlFor="email" className="block  mb-2 font-semibold font-sans text-[#2aa100] text-[16px] ">Email</label>
        <input
          type="email"
          id="email"
          placeholder='Enter your email here....'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-4 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-none sm:text-sm"
          required
        /> */}
        <label htmlFor="phoneNumber" className="block mb-2 font-semibold font-sans text-[#2aa100] text-[16px]">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mt-1 block w-full px-3 py-4 border mb-4 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-none sm:text-sm"
          required
        />
        {/* <label htmlFor="password" className="block ,b-2 font-semibold font-sans text-[#2aa100] text-[16px] ">Password</label> */}
        {/* <input
          type="password"
          id="password"
          value={password}
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-none sm:text-sm"
          required
        /> */}
        <div className="mt-12 flex space-x-4">
          <button
            type="submit"
            className="inline-flex items-center px-8 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#ee009d] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
          {/* <button
            type="button"
            className="inline-flex items-center px-4 py-2 border-none text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button> */}
        </div>
       </section>
       </section>
      </form>

      {/* Change Password Section */}
      <form onSubmit={handleChangePasswordSubmit} className="mt-16 space-y-4 ">
        <h2 className="text-green-700 text-2xl sm:text-3xl md:text-4xl mb-8 font-poppins font-semibold">Change Password</h2>
       <section className="bg-white rounded-2xl py-8 px-[3rem] mt-16">
       <label htmlFor="oldPassword" className="block mb-2 font-semibold font-sans text-[#2aa100] text-[16px]">Old Password</label>
        <input
          type="password"
          id="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-4 border mb-4 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-none sm:text-sm"
          required
        />
        <label htmlFor="newPassword" className="block mb-2 font-semibold font-sans text-[#2aa100] text-[16px]">New Password</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-4 border mb-4 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-none sm:text-sm"
          required
        />
        <label htmlFor="confirmPassword" className="block mb-2 font-semibold font-sans text-[#2aa100] text-[16px]">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-none sm:text-sm"
          required
        />
        <div className="mt-8 flex space-x-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#EE009D] hover:bg-[#2aa100] focus:outline-none focus:ring-none"
          >
            Save & Update
          </button>
        </div>
       </section>
      </form>
    </div>
  );
};

export default AdminAccountSettings;
