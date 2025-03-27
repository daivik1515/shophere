const mongoose=require('mongoose');
const Product=require('./shoprHereProducts');
const Customer=require('./customer');
const placeOrderSchema=new mongoose.Schema({

    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Customer.modelName
    },
    email:{
        type:String
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: Product.modelName
    }],
    shippingAddress:{
        firstName:{
            type:String,
            require:true
        },
        lastName:{
            type:String,
            require:true
        },
        Address:{
            streetAddress:{
                type:String,
                require:true
            },
            apartment:{
                type:String
            },
            city:{
                type:String,
                require:true
            },
            state:{
                type:String,
                require:true
            },
            postalCode:{
                type:String,
                require:true
            }
        }
}
    
    
})
const placeOrder=mongoose.model('PlaceOrder',placeOrderSchema);
module.exports=placeOrder;