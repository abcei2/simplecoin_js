import db from '../../../utils/db';
import cryptoRandomString from 'crypto-random-string';

export default async (req, res) => {
  try {
    const users = await db.collection('users').get();
    const usersData = users.docs.map(user => user.data());
    let mainKey=getMainKey();

    while (usersData.some(user => user.main_key === mainKey)) {
      mainKey=getMainKey();
    } 
    
    const { id } = await db.collection('users').add({
      main_key: mainKey,
      balance: 0,
      created: new Date().toISOString(),
    });
    res.status(200).json({ id, mainKey });

    
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

export const getStaticPaths = async () => {
  const entries = await db.collection("entries").get()
  const paths = entries.docs.map(entry => ({
    params: {
      slug: entry.data().slug
    }
  }));
  return {
    paths,
    fallback: true
  }
}
