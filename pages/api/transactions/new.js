import db from '../../../utils/db';
import cryptoRandomString from 'crypto-random-string';
export default async (req, res) => {
  
  if (req.method != 'POST') 
  {
    res.status(400).end();
    return
  }

  const {userId, mainKey, to, fee, ammount} = req.body

  try {
      /* Validate user */
      const usersRef = db.collection('users');
      const fromUser = await usersRef.doc(userId).get()
      let fromUserData = fromUser.data()
      let toUserData = null
      const from = fromUser.data().accountNumber
      
      if(!fromUser.data()){
          res.status(401).end();
      }
      if(fromUser.data().mainKey!=mainKey){
          res.status(401).end();
      }
      ////////////////////////////
      if(substraction(fromUser.data().balance,ammount)<0){
        res.status(401).json({message:"you don't have enought coins"});
        return
      }

      await usersRef.where("accountNumber", "==", to).get().then(data =>
      {
          if(!data.docs[0]){
            res.status(401).json({message:"user doesn't exists"});
            return
          }
          toUserData = data.docs[0].data()
          toUserData.balance = add(toUserData.balance,ammount)
          usersRef.doc(data.docs[0].id).set(toUserData)
          
          fromUserData.balance=substraction(fromUserData.balance,ammount)
          usersRef.doc(fromUser.id).set(fromUserData)

          const transactionsRef = db.collection('transactions');

            
          const { id } =  transactionsRef.add({
              reference:cryptoRandomString({length: 16, type: 'alphanumeric'}),
              from:from,
              to:to,
              accountFee: fee,
              ammount : ammount,
              created: new Date().toISOString(),
          });
          res.status(200).json({ id });      
      
      });
    
  } catch (e) {
      res.status(400).end();
  }
}

function substraction(a,b){
  return parseFloat(a)-parseFloat(b)
}

function add(a,b){
  return parseFloat(a)+parseFloat(b)
}