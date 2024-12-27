const User = require('../Models/user')
const jwt = require('jsonwebtoken')


const userAuth = async(req, res, next)=>{  // this is middleware
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error('Invalid token')
        }
    
        const data = await jwt.verify(token, 'saad@123')
        const { id } = data;
    
        const user = await User.findById({_id: id});
    
        req.user = user;
        next();
        
    }
    
        catch(err){
            res.status(400).send(`Error: ${err.message}`)
        }
}

module.exports = userAuth;