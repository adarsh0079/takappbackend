const {Schema,model} =require('mongoose')

const AuthorSchema=new Schema({
    author:{
        type:String,
        unique:true
    }
})
module.exports=model('Author',AuthorSchema)