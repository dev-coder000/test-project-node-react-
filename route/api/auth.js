const express = require("express");

const router=express.Router();

const auth=require("../../middleware/auth")

const User=require("../../models/User")
 
const {check,matchedData,validationResult}=require("express-validator")

const jwt=require("jsonwebtoken")

const bycrypt=require("bcryptjs");

const config=require("config");

router.get("/",auth,
    async (req,res)=>{
      try{
         const data=await User.findById(req.user.id).select("-password")
         res.json({data})
      }catch(err){
          console.error(err.message)
          res.status(500).send("Server error")
      }
    // res.send("Auth route")
});

router.post("/login",[
    check("email","Enter valid email").isEmail(),
    check("password","Password cant be blank").notEmpty()
],
    async (req,res)=>{
    // console.log(req.body)
    const error=validationResult(req)
    try{
    if(error.isEmpty()){
      const data=matchedData(req)
      const {email,password}=data
      let user=await User.findOne({email})
      if (!user){
        return res.status(300).send('Invalid credentials')
      }
      const match=await bycrypt.compare(password,user.password)
      if(!match){
        return res.status(300).send('Invalid credentials')
      }
      
     const payload={
      user:{
        id:user.id
      }
     }
     jwt.sign(payload,
      config.get("jsonToken"),
      {expiresIn:36000},
      (err,token)=>{
        if(err) throw err
        return res.json({token})
      }
    )
    //  return res.status(200).send("User Registered")
    
    }else{
     return res.status(400).send({errors:error.array()})
    }
    }
    catch(err){
        console.error(err.message)
        return res.status(500).json({errors:[{msg:"server error"}]})
    }
    
});

module.exports=router;