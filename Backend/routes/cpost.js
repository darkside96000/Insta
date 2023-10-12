const express=require('express');
const router=express.Router()
const mongoose=require('mongoose');
const POST = mongoose.model("POST")

const RequireLogin = require('../middlewares/RequireLogin');


// Route
router.get("/allposts",RequireLogin,(req,res)=>{
    POST.find()
    .populate("postedBy","_id name")
    .then(posts=>res.json(posts))
    .catch(err=>console.log(err))

})




router.post("/createPost",RequireLogin,(req,res)=>{
    const {body,pic}=req.body;
    console.log(pic)
    if(!body || !pic){
        return res.status(422).json({error:"please add all the fields"}) 
     }
     //console.log( req.user)
        
        const post=new POST({
            body,
            photo:pic,
            postedBy:req.user
        })
        post.save().then((result)=>{
            return res.json({post:result})
        }).catch(err=>console.log(err))
    
   
});
router.get("/myposts",RequireLogin,(req,res)=>{
    POST.find({postedBy:req.user._id})
    .populate("postedBy" , "_id name")
    .then(myposts=>{
        res.json(myposts)
    });
})

module.exports=router