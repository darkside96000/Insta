const express=require('express');
const router=express.Router()
const mongoose=require('mongoose');
const USER= mongoose.model('USER');
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');
const {jwt_secret}=require("../key");
const RequireLogin = require('../middlewares/RequireLogin');


router.get('/',(req,res)=>{
    res.send("hello")

})
// router.get("/CreatePost",RequireLogin,(req,res)=>{
//     console.log('hello auth')

// })


router.post("/SignUp",(req,res)=>{
    const{name,userName,email,password}=req.body;
    if(!name || !email ||!userName || !password){
        return res.status(422).json({ error: "please add all the fields."})
    }
    USER.findOne({$or:[{email:email},{userName:userName}]}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user has already exist"})
        }
        bcrypt.hash(password, 15).then((hashedPass)=>{
            const user =new USER({
                name,
                email,
                userName,
                password:hashedPass
            })
            user.save()
            .then(user=>{res.json({message:"Registered successfully!!"})})
            .catch(err=>{console.log(err)})

        })
        
       
        
    })
    
})

router.post("/signIn",(req,res)=>{
    const {email,password}=req.body;
    if(!email|| !password){
        return res.status(422).json({error:"Please add email and password"})
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if (!savedUser){
            return res.status(422).json({error:"Invalid Email"})
        }
        
        bcrypt.compare(password,savedUser.password).
        then((match)=>{
            if(match){
                // return res.status(200).json({message:"Signed In Successfully!!"})
                const token =jwt.sign({_id:savedUser.id},jwt_secret)
                res.json(token)
                console.log(token)
            }else{
                return res.status(422).json({error:"invalid Password!"})
            }
        }).catch(err=>console.log(err))

    })
    

})

module.exports=router;