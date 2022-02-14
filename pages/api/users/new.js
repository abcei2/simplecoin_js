import db from '../../../utils/db';
import cryptoRandomString from 'crypto-random-string';

export default async (req, res) => {
  
  if (req.method != 'POST') {
    
    res.status(400).end();
    return
  }
  try {
    const users = await db.collection('users').get();
    const usersData = users.docs.map(user => user.data());
    
    let mainKey=getMainKey();
    let accountNumber = cryptoRandomString({length: 10, type: 'numeric'})

    while (usersData.some(user => user.mainKey === mainKey)) {
      mainKey=getMainKey();
    } 
    while (usersData.some(user => user.accountNumber === accountNumber)) {
      accountNumber=cryptoRandomString({length: 10, type: 'numeric'});
    } 
    
    const { id } = await db.collection('users').add({
      mainKey: mainKey,
      accountNumber: accountNumber,
      balance: 1000,
      created: new Date().toISOString(),
    });
    res.status(200).json({ id, mainKey, accountNumber });

    
  } catch (e) {
    console.log(e)
    res.status(400).end();
  }
}

function getMainKey(){
  
  let randomid = cryptoRandomString({length: 10, type: 'alphanumeric'})
  for(let i=0;i<11;i++)
    randomid+= "-"+cryptoRandomString({length: 10, type: 'alphanumeric'});
  return randomid
}

