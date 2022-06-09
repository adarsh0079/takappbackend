const {Schema,model} =require('mongoose')

const TechSchema=new Schema({
    technology:{
        type:String,
        unique:true
    }
})
module.exports=model('Technology',TechSchema)