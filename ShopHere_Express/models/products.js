const mongoose=require('mongoose');
const productSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            require:true,
            min:0
        },
        category:{
            type:String,
            lowercase:true,
            enum:['fruit','vegetable','diary']
        },
        seedData:{
            type:String,
        },
        imageId: {
            type: mongoose.Schema.Types.ObjectId, // Reference to GridFS file
            // ref: 'fs.files',
            //required: true,
        }
    }
)
const Product=mongoose.model('Product',productSchema);
module.exports=Product;