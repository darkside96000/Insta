const jwt=require('jsonwebtoken')
const {jwt_secret}=require('../key')
const mongoose=require("mongoose")
const USER=mongoose.model("USER")


module.exports=(req,res, next)=>{
    console.log("hello middleware")
    const{authorization}=req.headers;
    if(!authorization){
        return res.status(401).json({error:"you must have logged in 1"})
    }
    
    const token =authorization.replace("Skirr" , "")
    jwt.verify(token,jwt_secret,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must have logged in 2 "})
        }
        const {_id}=payload
        USER.findById(_id).then(userData=>{
            //console.log(userData)
                req.user=userData
                next()
           
        })
        
    })
  
   
}