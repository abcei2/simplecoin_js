
import { useRouter } from 'next/router'
import AccountBalance from '../components/dashboard/balance';
import Transactions from '../components/dashboard/transactions';
import Signin from '../components/ui/signin';
import React, { useEffect, useState } from 'react';
export default function Home() {
  
  const router = useRouter()
  const [userId, setUserId] = useState("")
  const [mainKey, setMainKey] = useState("")
  useEffect(() => {
    setUserId(localStorage.getItem("userId"))
    setMainKey(localStorage.getItem("mainKey"))
   
  }, [userId]);

  if (userId)
    return (
      <div>
        
        <AccountBalance userId={userId} mainKey={mainKey}></AccountBalance>
        <Transactions  userId={userId} mainKey={mainKey}></Transactions>
      </div>
    
    );
  else
    return (
      <div>
        <Signin></Signin>
    
      </div>
    
    );
}
