const express = require("express");

const {check,matchedData,validationResult}=require("express-validator")

const gravatar=require("gravatar")

const jwt=require("jsonwebtoken")

const bycrypt=require("bcryptjs");

const config=require("config")

const { findOne } = require("../../models/User");

const router=express.Router();

router.post("/",[
    check("name","Name is required").notEmpty(),
    check("email","Enter valid email").isEmail(),
    check("password","Password should be minimum of 6 character").isLength({min:6})
],
    async (req,res)=>{
    // console.log(req.body)
    const error=validationResult(req)
    try{
    if(error.isEmpty()){
      const data=matchedData(req)
      const {name,email,password}=data
      let user=await User.findOne({email})
      if (user){
        return res.status(300).send('User already exists')
      }
      const avatar= await gravatar.url(email,{
        s:"200",
        r:"pg",
        d:"mm"
      })
      user= new User({
        name,
        email,
        avatar,
        password
      })
      const salt=await bycrypt.genSalt(10)
      user.password= await bycrypt.hash(password,salt)
      await user.save()
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