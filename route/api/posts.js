const express = require("express");
const connect= require("../../config/db");
const router=express.Router();
const auth=require("../../middleware/auth")
const {check,validationResult, query}=require("express-validator")
const Post= require("../../models/Post")
const User=require("../../models/User")
const Profile=require("../../models/Profile");
const { ObjectId } = require("mongodb");
router.post("/",[auth,[
    check("text","text is required").notEmpty()]
],
async(req,res)=>{
     const errors=validationResult(req)
     if(!errors.isEmpty()){
       return res.status(401).json({error:errors.array()})
     }
     try {
        const user=await User.findById(req.user.id).select("-Password")

     const newpost= new Post({
        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id
     })
     const post= newpost.save()
   return res.status(200).send("Post is saved")
     } catch (error) {
        console.error(error)
    return res.status(500).send("Server error")
     }
     
})
// Find all Posts


// router.get("/",auth,async(req,res)=>{
//    try {
//       const post= await Post.find().sort({date:-1})
//       res.json(post)
//    } catch (error) {
//     console.error(error)
//     return res.status(500).send("Server error")
//    }
// })

//find single post By ID
///@id=post'id//////////
router.get("/:id",auth,async(req,res)=>{
   try {
      const post= await Post.findById(req.params.id)
      if(!post){
         return res.status(401).json({msg:"Post not found"})
      }
      res.json(post)
   } catch (error) {
      if(error.kind=='ObjectId'){
         return res.status(401).json({msg:"Post not found"})
      }
    console.error(error)
    return res.status(500).send("Server error")
   }
})

//Delete post of the user///
///@id=post'id//////////
router.delete("/:id",auth,async(req,res)=>{
   try {
      const post= await Post.findById(req.params.id)
      if(!post){
         return res.status(401).json({msg:"Post not found"})
      }
      if(post.user.toString()!== req.user.id){
         return res.status(404).json({msg:"User is unauthorized"})
      }
    
      await Post.findByIdAndDelete(req.params.id);
      res.json({msg:"post is removed"})
   } catch (error) {
      if(error.kind=='ObjectId'){
         return res.status(401).json({msg:"Post not found"})
      }
    console.error(error)
    return res.status(500).send("Server error")
   }
})


///Like the post///////////
///@id=post'id//////////
router.put("/like/:id",auth,async(req,res)=>{
   try {
      const post=await Post.findById(req.params.id)
    if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
      return res.status(401).json({msg:"Post already liked"})
    }
     post.likes.unshift({user:req.user.id})
     await post.save()
     res.send(post.likes)
   }
   catch (error) {
      console.error(error)
    return res.status(500).send("Server error")
   }
})
//////unlike the post//////////
///@id=post'id//////////
router.put("/unlike/:id",auth,async(req,res)=>{
   try {
      const post=await Post.findById(req.params.id)
    if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
      return res.status(401).json({msg:"Post has not yet been liked"})
    }
     const removeindex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id)
     post.likes.splice(removeindex,1)
     await post.save()
   }
   catch (error) {
      console.error(error)
    return res.status(500).send("Server error")
   }
})
/////////Add comments//////////////
///@id=post'id//////////
router.post("/comment/:id",[auth,[
    check("text","text is required").notEmpty()]
],
async(req,res)=>{
     const errors=validationResult(req)
     if(!errors.isEmpty()){
       return res.status(401).json({error:errors.array()})
     }
     try {
        const user=await User.findById(req.user.id).select("-Password")
       const post=await Post.findById(req.params.id)
     const newcomment= {
        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id
     }
     post.comments.unshift(newcomment)
      await post.save()
   res.status(200).send(post.comments)
     } catch (error) {
        console.error(error)
    res.status(500).send("Server error")
     }
     
})


//Delete comment of the user//////////
//@id=post id//////////
//@comment_id=comment id//////////
//@user.id=users'id/////////
router.put("/comment/:id/:comment_id",auth,async(req,res)=>{
   try {
      const post= await Post.findById(req.params.id)
      const comment=post.comments.find(comment=>comment.id===req.params.comment_id)
      if(!comment){
          return res.status(400).json({msg:"Comment has not been made yet"})
      }
      if(comment.user.toString()!==req.user.id){
          return res.status(401).json({msg:"user not authorized"})
      }
          const removeindex=post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id)
          post.comments.splice(removeindex,1)
          post.save()
          res.json({msg:"Comment is removed"})
   } catch (error) {
      if(error.kind=='ObjectId'){
         return res.status(401).json({msg:"Post not found"})
      }
    console.error(error)
    return res.status(500).send("Server error")
   }
})
module.exports=router;