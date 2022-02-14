export default async (req, res) => {
  
    
    const {userId, mainKey, reference, from, to, accountFee, ammount, transactionId} = req.query
  
    try {
        const usersRef = db.collection('users');
        const transactionsRef = db.collection('transactions');
        const doc = await usersRef.doc(userId).get();

        if(!doc.data()){
            res.status(401).end();
        }
        if(doc.data().mainKey!=mainKey){
            res.status(401).end();
        }

        if (req.method === 'POST') {
              
            const { id } = await transactionsRef.add({
                reference,
                from,
                to,
                accountFee,
                ammount,
                created: new Date().toISOString(),
            });
            res.status(200).json({ id });
        
    
        } else if (req.method === 'GET') {
            const doc = await db.collection('transactions').doc(transactionId).get();
            if (!doc.exists) {
            res.status(404).end();
            } else {
            res.status(200).json(doc.data());
            }
        } else if (req.method === 'DELETE') {
            await db.collection('transactions').doc(transactionId).delete();
        }
        res.status(200).end();
    } catch (e) {
        res.status(400).end();
    }
  }