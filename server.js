const express=require("express");

const connect=require("./config/db");

const app=express();

connect();

const port=process.env.PORT || 8000


app.listen(port,()=>console.log(`server is runnning on port ${port}`));

app.use(express.json({extended:true}))

app.use("/api/users",require("./route/api/users"));

app.use("/api/auth",require("./route/api/auth"));

app.use("/api/posts",require("./route/api/posts"));

app.use("/api/profile",require("./route/api/profile"));

app.use("/api/client",require("./route/api/client"));

app.get("/",(req,res)=>res.send("API is running"));