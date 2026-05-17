import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpPostWithoutToken } from '../../../utils/http_utils';
import ls from "localstorage-slim";
import { Button, useToast } from '@chakra-ui/react';
import { AppContext } from '../../../global/state';

const Login = () => {
  const {updateUser}:any = useContext(AppContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async () => {
      let d = {
        email: username,
        password: password,
      }
      setIsSubmitting(true)
      const response = await httpPostWithoutToken("admin/login", d)
      setIsSubmitting(false)
  
      if(response.status == "success") {
        toast({
          status : "success",
          title : "Login successful!",
          isClosable : true,
        })
        sessionStorage.setItem("wwph_token", response.access_token);
        sessionStorage.setItem("wwph_usr", JSON.stringify(response.user));
        ls.set("wwph_token", response.access_token, {encrypt : true});
        ls.set("wwph_usr", response.user, {encrypt : true});
        updateUser(response.user)
        navigate("/admin/admin-jobs")
      }else{
        toast({
          status : "error",
          title : response.message,
          isClosable : true,
        })
      }
  
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button 
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handleLogin}
          isLoading={isSubmitting}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
