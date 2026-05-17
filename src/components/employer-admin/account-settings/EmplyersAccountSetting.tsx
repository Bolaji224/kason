import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../global/state';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { httpGetWithToken, httpPostWithToken } from '../../../utils/http_utils';

const EmployerAccountSetting: React.FC = () => {
  const navigate = useNavigate();
  const { updateUser }: any = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // State for form fields
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ✅ Fetch profile
  const getProfile = async () => {
  try {
    const res = await httpGetWithToken('employer/profile');
    if (res?.data) {
      setCompanyName(res.data.name || '');
      setPhoneNumber(res.data.phone_no || '');
      updateUser(res.data);
    }
  } catch (error) {
    console.error('Profile fetch error:', error);
    toast({
      status: 'error',
      title: 'Error fetching profile',
      isClosable: true,
      duration: 5000,
    });
  }
};

  useEffect(() => {
    getProfile();
  }, []);

  // ✅ Update profile
  const handleAccountInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const fd = {
      name: companyName,
      phone_no: phoneNumber,
    };

    try {
    const resp = await httpPostWithToken('employer/profile', fd);
if (resp?.data || resp?.status === 'success') {
  await getProfile();
  toast({ status: 'success', title: 'Profile updated successfully', isClosable: true, duration: 5000 });
} else {
  toast({ status: 'error', title: resp?.error || resp?.message || 'Profile update failed', isClosable: true, duration: 5000 });
}
    } catch (error) {
      console.error('Profile update error:', error);
      toast({ status: 'error', title: 'Error updating profile', isClosable: true, duration: 5000 });
    }
    setLoading(false);
  };

  // ✅ Change password
  const handleChangePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const fd = {
      password: newPassword,
      password_confirmation: confirmPassword,
      current_password: oldPassword,
    };

    try {
      const resp = await httpPostWithToken('user/change-password', fd);
      if (resp?.status === 'success') {
        toast({
          status: 'success',
          title: 'Password updated successfully',
          isClosable: true,
          duration: 5000,
        });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast({
          status: 'error',
          title: resp?.error || 'Password update failed',
          isClosable: true,
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Password update error:', error);
      toast({
        status: 'error',
        title: 'Error updating password',
        isClosable: true,
        duration: 5000,
      });
    }

    setLoading(false);
  };

  return (
    <div className="lg:ml-64 max-w-[1100px] mx-auto py-16 mt-[4rem]">
      <h1 className="text-green-700 text-2xl sm:text-3xl md:text-4xl mb-4 font-poppins font-semibold">
        Account Settings
      </h1>

      {/* Account Information Section */}
      <form onSubmit={handleAccountInfoSubmit} className="space-y-4">
        <section className="bg-white rounded-2xl py-16 px-[3rem] mt-8">
          <h2 className="text-[#EE009D] text-[18px] sm:text-xl font-poppins font-semibold">Edit & Update</h2>
          <section className="py-8">
            <div className="grid grid-cols-1 gap-x-4 mb-4">
              <div>
                <label
                  htmlFor="companyName"
                  className="block mb-2 font-semibold font-sans text-[#2aa100] text-[16px]"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="Enter company name..."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                  required
                />
              </div>
            </div>

            <label
              htmlFor="phoneNumber"
              className="block mb-2 font-semibold font-sans text-[#2aa100] text-[16px]"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-4 border mb-4 border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              required
            />

            <div className="mt-12 flex space-x-4">
              <button
                type="submit"
                className="inline-flex items-center px-8 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-[#ee009d] hover:bg-[#2aa100] focus:outline-none"
              >
                Save
              </button>
            </div>
          </section>
        </section>
      </form>

      {/* Change Password Section */}
      <form onSubmit={handleChangePasswordSubmit} className="mt-16 space-y-4">
        <h2 className="text-green-700 text-2xl sm:text-3xl md:text-4xl mb-8 font-poppins font-semibold">
          Change Password
        </h2>
        <section className="bg-white rounded-2xl py-8 px-[3rem] mt-16">
          <label
            htmlFor="oldPassword"
            className="block mb-2 font-semibold font-sans text-[#2aa100] text-[16px]"
          >
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-4 border mb-4 border-gray-300 rounded-md shadow-sm"
            required
          />

          <label
            htmlFor="newPassword"
            className="block mb-2 font-semibold font-sans text-[#2aa100] text-[16px]"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-4 border mb-4 border-gray-300 rounded-md shadow-sm"
            required
          />

          <label
            htmlFor="confirmPassword"
            className="block mb-2 font-semibold font-sans text-[#2aa100] text-[16px]"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm"
            required
          />

          <div className="mt-8 flex space-x-4">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-[#EE009D] hover:bg-[#2aa100] focus:outline-none"
            >
              Save & Update
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default EmployerAccountSetting;
