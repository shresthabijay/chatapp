const jwt=require("jsonwebtoken")
const secretKey="super-secret"


const authenticateToken=(req,res,next)=>{ 
    try{
        var decoded=jwt.verify(req.body.token,secretKey)
        if(decoded){
            next()
        }

    }
    catch(err){
        res.status(201).send({message:"Authorization Failed!"})
    }
    
}

module.exports={secretKey,authenticateToken}

