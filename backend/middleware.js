const jwt =require("jsonwebtoken");
const { jwtPassword } = require("./config");

function authMiddleware(req,res,next){
    if(!req.headers.authorization)return res.status(403).json("Authentication token missing");

    let authToken= req.headers.authorization.split(' ')[1];
    try{
        let payload=jwt.verify(authToken,jwtPassword);
        req.userId=payload.userId;
        console.log(typeof(req));
    }catch(error){
        console.log(`In authMiddleware function : ${error.message}`);
        return res.status(403);
    }
    next();
}

module.exports={
    authMiddleware
}