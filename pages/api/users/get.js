import db from '../../../utils/db';

export default async (req, res) => {
  

    if (req.method === 'POST') {
        let mainKey=req.body.mainKey,
            userId=req.body.userId;

        var usersRef = db.collection("users");
        if(mainKey){
            if(userId == undefined){
                await usersRef.where("mainKey", "==", mainKey).get().then(data =>
                    {
                        userId = data.docs[0].id
                    });
            }
       
                    
        }else{
            res.status(401).end();
        }    

        try  {
            const doc = await usersRef.doc(userId).get();
            if(!doc.data()){
                res.status(401).end();
                return
            }
            if(doc.data().mainKey!=mainKey){
                res.status(401).end();
                return
            }
            
            if (!doc.exists) {
                res.status(404).end();
                return
            } else {
                let data = doc.data()
                data.id = doc.id
                res.status(200).json(data);
                return
            }        

        } catch (e) {
            console.log(e)
            res.status(400).end();
            return
        }
    }
    else
        res.status(401).end();
        return
}