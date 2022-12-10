const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req,res,next) =>{
    try {
        let token = req.header("auth-token");
        if(!token){
            return res.status(401).json({error:"Unauthorized User"})
        }
        let data = jwt.verify(token,process.env['SECRET_KEY']);
        console.log(data);
        req.userId = data.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({error:"Unauthorized User"})
    }
}
module.exports = auth;