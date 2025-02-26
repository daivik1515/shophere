const mongoose=require('mongoose');
const customerSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        phoneNumber:{
            type:Number,
            require:true,
            min:0
        },
        password:{
            type:String,
            required:true
        },
        category:{
            type:String,
            lowercase:true,
            enum:['admin','customer','vendor']
        },
        seedData:{
            type:String,
        }
    }
)
const Customer=mongoose.model('Customer',customerSchema);
module.exports=Customer;