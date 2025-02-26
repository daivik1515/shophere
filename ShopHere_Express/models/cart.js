const mongoose=require('mongoose');
const Customer=require('./customer');
const Product=require('./shoprHereProducts');
const cartSchema=new mongoose.Schema(
    {
        custId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: Customer.modelName,
            require:true
        },
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: Product.modelName,
            require:true
        },
        quantity:{
            type:Number,            
        }
    }
)
const Cart=mongoose.model('cart',cartSchema);
module.exports=Cart;