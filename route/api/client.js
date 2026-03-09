const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const bycrypt=require("bcryptjs")
const client=require("../../models/Client")
const { domainToASCII } = require("node:url")
const config=require("config")
router.post("/prof",async(req,res)=>{
const {name,email,password}=req.body
let data=await client.findOne({email})
if(data){
    res.status(300).json({message:"Client already exists"})
}
else{
    data=new client({
        name,
        email,
        password,
    })
    const salt=await bycrypt.genSalt(10)
    data.password=await bycrypt.hash(password,salt)
    await data.save();
    const payload={
        data:{
            id:data.id
        }
    }
    jwt.sign(payload,
        config.get("jsonToken"),
        {expiresIn:36000},
        (err,token)=>{
            if(err)throw err
            res.header("x-auth-token", token).status(200).json({
                message:"Data saved successfully",
            })
            
            
        }
    )
   
    // res.status(200).json({message:"Data saved successfully"})
}
})
module.exports=router
