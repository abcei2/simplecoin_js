
import { useRouter } from 'next/router'
import AccountBalance from './components/dashboard/balance';
import React, { useEffect, useState } from 'react';
export default function Home() {
  
  const router = useRouter()
  const [userId, setUserId] = useState("")
  useEffect(() => {
    setUserId(localStorage.getItem("userId"))
      if(!localStorage.getItem("mainKey"))
        router.push("/signin")
  }, []);
  return (
    <div>
      
      <AccountBalance userId={userId}></AccountBalance>
   
    </div>
   
  );
}
