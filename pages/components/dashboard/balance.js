
import axios from 'axios';
import { useEffect, useState } from 'react';
const AccountBalance = (props) => {
    
    
    const { userId } = props;
    const [balance, setBalance] = useState(-1)


    axios.get('http://localhost:3000/api/users/'+userId).then(response => {
    
        setBalance(response.data.balance)
        
    });
    
    return (
        <div>
            <h1>Balance_ {balance}</h1>
            
        </div>
    );
};




export default AccountBalance;