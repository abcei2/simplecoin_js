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
            res.status(401).json({message:"debe proporcionar la llave principal"});
        }    

        try  {
            const doc = await usersRef.doc(userId).get();
          
            
            if (!doc.exists) {
                res.status(401).json({message:"el usuario no existe"});
                return
            } else {
                if(doc.data().mainKey!=mainKey){
                    res.status(401).json({message:"la llave principal no coincide con el usuario"});
                    return
                }
                let data = doc.data()
                data.id = doc.id
                res.status(200).json(data);
                return
            }        

        } catch (e) {
            res.status(401).json({message:"error interno"});
            return
        }
    }
    else
        res.status(400).end();
        return
}