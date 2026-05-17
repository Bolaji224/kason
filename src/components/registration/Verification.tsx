import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Images from "../constant/Images";
import { httpPostWithoutToken, validateEmail } from "../../utils/http_utils";
import { useToast } from "@chakra-ui/react";

const AccountVerification: React.FC = () => {
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState <string>('')
  const location = useLocation();
  const search = location.search;
  const navigate = useNavigate();
  const toast = useToast();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const hash = params.get("hash");

    if (!id || !hash) {
      toast({
        status: "error",
        title: "Invalid verification link",
        isClosable: true,
      });
      navigate("/login");
      return;
    }

   // Call Laravel backend to verify email
   const verifyEmail = async () => {
    try {
      const response = await fetch(`http://localhost:8000/email/verify/${id}/${hash}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        toast({
          status: "success",
          title: "Account verified successfully!",
          isClosable: true,
        });

        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setStatus("error");
        const data = await response.json();
        toast({
          status: "error",
          title: data.message || "Verification failed",
          isClosable: true,
        });
      }
    } catch (err) {
      setStatus("error");
      toast({
        status: "error",
        title: "An error occurred during verification",
        isClosable: true,
      });
      console.error(err);
    }
  };

  verifyEmail();
}, [location.search, navigate, toast]);


  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md xl:max-w-[1300px] lg:max-w-[900px] mx-auto gap-8 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 p-8">
        {status === "loading" && <p>Verifying your account, please wait...</p>}
        {status === "success" && <p className="text-green-600 font-bold">Your account has been successfully verified! Redirecting to login...</p>}
        {status === "error" && <p className="text-red-600 font-bold">Account verification failed. Please try again or contact support.</p>}
        </div>
        <div className="w-full lg:w-1/2">
          <img src={Images.LoginImage} alt="login" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default AccountVerification;

