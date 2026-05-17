import React, { useEffect } from 'react';

import SideNav from './side-bar/SideBar';
import Header from './header/Header';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { NotificationProvider } from './NotificationContext';


interface EmployersLayoutProps { element : any }


const EmployersLayout: React.FC<EmployersLayoutProps>  = ({element}) => {
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
      <NotificationProvider>
      <Header />
      <div className="flex flex-1">
        <SideNav />
        <main className="flex-1 p-4">
          <section>
            {element}
          </section>
        </main>
      </div>
      </NotificationProvider>
    </div>
  );
};

export default EmployersLayout;