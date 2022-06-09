const {Schema,model} =require('mongoose')

const ArticleSchema=new Schema({
    image:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
    },
    technology:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=model('article',ArticleSchema);