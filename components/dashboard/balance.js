
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
const AccountBalance = (props) => {
    
    
    const [balance, setBalance] = useState(-1)
    const [accountNumber, setAccountNumber] = useState("")
    const router = useRouter()
    axios.post( process.env.HOST+'/api/users/get',
    {        
        userId: props.userId,
        mainKey: props.mainKey
        
    }).then(response => {
        setBalance(response.data.balance)
        setAccountNumber(response.data.accountNumber)
        
    });
  
    
    return (
        
        <div>
            <h1>Balance: {balance}</h1>
            
            <h1>AccountNumber: {accountNumber}</h1>
            
        </div>
    );
};




export default AccountBalance;