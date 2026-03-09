const express= require("express")

const config=require("config")

 const jwt=require("jsonwebtoken")

module.exports=function(req,res,next){
    const token=req.header('x-auth-token')

    if(!token){
        return res.status(401).send("No token, authorization denied")
    }
    else{
        try{
            const decoded=jwt.verify(token,config.get("jsonToken"))
            req.user=decoded.user
            next()
        }catch(err){
            console.error(err.message)
            res.status(401).send("Token is not valid")
        }
    }
}