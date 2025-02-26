const mongoose=require('mongoose');
const productSchema=new mongoose.Schema(
    {
        productName:{
            type:String,
            required:true
        },
        productPrice:{
            type:Number,
            require:true,
            min:0
        },
        categoryName:{
            type:String,
            lowercase:true
        },
        seedData:{
            type:String,
        },
        productImageUrl: {
            type: String, // Reference to GridFS file
            // ref: 'fs.files',
            //required: true,
        },
        productDescription:{
            type:String,
        }
    }
)
const AppProduct=mongoose.model('ShophereProduct',productSchema);
module.exports=AppProduct;