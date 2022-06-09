const express=require('express')
const cors=require('cors')
require('dotenv').config();
const mongoose=require('mongoose')
mongoose.connect(process.env.MONGO_URI);
const app=express();

app.listen(process.env.PORT | 8080,()=>{
    console.log('server started')
})