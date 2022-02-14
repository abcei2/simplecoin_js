import db from '../../../utils/db';
import cryptoRandomString from 'crypto-random-string';
export default async (req, res) => {
  
  if (req.method != 'POST') 
  {
    res.status(400).end();
    return
  }

  const {userId, mainKey} = req.body

  try {
      /* Validate user */
      
      const usersRef = db.collection('users');
      const fromUser = await usersRef.doc(userId).get()      
         
      if (!fromUser.exists) {
          res.status(401).json({message: "user doesn't exists"})
          return
      }
      if(fromUser.data().mainKey!=mainKey){          
        res.status(401).json({message:"la llave principal no coincide con el usuario"});
      }
      ////////////////////////////
     
      const transactionsRef = db.collection('transactions');
      let transactionsData = []
      
      await transactionsRef.where("from", "==", fromUser.data().accountNumber).get().then(data =>
      {
        if (data.empty) {
          
          res.status(400).json({message:"no transactions"});
          return;
        }
        else{
          let aux =null
          data.docs.forEach(transaction => {
            aux = transaction.data()
            aux.id= transaction.id
            transactionsData.push(aux)
          })
          res.status(200).json({transactions:transactionsData});
        }      
               
      });
    
  } catch (e) {
    
      console.log(e)
      res.status(400).end();
  }
}

function substraction(a,b){
  return parseFloat(a)-parseFloat(b)
}

function add(a,b){
  return parseFloat(a)+parseFloat(b)
}