const mongodb= require("mongoose");

const config= require("config");

const db=config.get("mongoURI");

const connectdb=async ()=>{
    try{
       await mongodb.connect(db);
       console.log("Database is connected..");
    }catch(err){
        console.error(err.message);
        process.exit(1)
    }
}
module.exports=connectdb;