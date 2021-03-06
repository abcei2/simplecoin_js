
import { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
const Transactions = (props) => {    
    const [transactionsItems, setTransactionsItems] = useState([])
    useEffect(()=>{      
        
        listTransacitons()
    }, [])
    const sendMoney = async event => {
        event.preventDefault()
        
        axios.post(process.env.HOST+'/api/transactions/new',     {        
            userId: props.userId,
            mainKey: props.mainKey,
            to:event.target.to.value,
            fee:process.env.TRANSACTION_FEE, 
            ammount:event.target.ammount.value

        }).then(response => {

        }).catch(function (error) {
            if (error.response) {
                document.getElementById("errorLabel").innerHTML=error.response.data.message
            }
        });
    }
    const listTransacitons = async () => {
        axios.post(process.env.HOST+'/api/transactions/getall',     {        
            userId: props.userId,
            mainKey: props.mainKey
        }).then(response => {
            setTransactionsItems(response.data.transactions.map((transaction) =>
                <li >{transaction.accountFee}  {transaction.created} {transaction.to} {transaction.ammount}  {transaction.from} {transaction.reference}</li>
            ))
        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                document.getElementById("errorLabel").innerHTML=error.response.data.message
            }
        });
    }
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <form onSubmit={sendMoney}>
                            

                        <div className="form-group">
                            <label htmlFor="inputKey">Cuenta destino</label>
                            <input
                            type="text"
                            className="form-control"
                            id="to"
                            placeholder="Ingrese el n??mero de cuenta destino"
                            />
                        </div>   
                        <div className="form-group">
                            <label htmlFor="inputKey">Cantidad</label>
                            <input
                            type="number"
                            className="form-control"
                            id="ammount"
                            placeholder="Ingrese la cantidad"
                            />
                        </div>        
                        
                        <button type="submit" className="btn btn-primary" >
                            Submit
                        </button>
                    </form>
                    <label id="errorLabel"></label>
                 
                </div>
                <ul>
                    {transactionsItems}
                </ul>
            </div>
        </div>
    );
};


  
export default Transactions;