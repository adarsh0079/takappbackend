const express = require("express");
const UserRoute = require("./routes/user");
const articleRoute = require("./routes/article");
const cors = require("cors");
require("dotenv").config();
const Technology=require('./models/Technology')
const Author=require('./models/Author')
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURI);
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome to api");
});
app.use("/article", articleRoute);
app.get('/techs',async (req,res)=>{
  try{
    let techs=await Technology.find({});
    res.status(200).json({message:"success",technology:techs})
  }catch(err){
    res.status(500).json({...err,message:"server error"})
  }
})
app.get("/authors", async (req, res) => {
  try {
    let authors = await Author.find({});
    res.status(200).json({ message: "success", authors });
  } catch (err) {
    res.status(500).json({ ...err, message: "server error" });
  }
});

app.use("/user", UserRoute);
app.get('/',(req,res)=>{
  res.send("server running")
})
app.listen(process.env.PORT || 8080, () => {
  console.log("server started");
});
