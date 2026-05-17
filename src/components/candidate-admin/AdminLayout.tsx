import React, { useEffect } from 'react';
import Header from './Header';
import SideNav from './SideBar';
import { useNavigate } from 'react-router-dom';
import ls from "localstorage-slim";
import { useToast } from '@chakra-ui/react';


interface AdminLayoutProps { element : any }


const AdminLayout: React.FC<AdminLayoutProps>  = ({element}) => {
  const navigate = useNavigate()
  const toast = useToast();
  useEffect(()=> {
    if(sessionStorage.getItem("wwph_token")){
      
    }else {
      toast({
        status : "error",
        title : "Unauthorized",
        description : "Please login first",
        isClosable : true,
        duration : 5000
      })
      navigate("/login")
    }
  }, [])
 
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#FFF5F8]">
      <Header />
      <div className="flex flex-1">
        <SideNav />
        <main className="flex-1 p-4">
          <section>
            {element}
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
