const express = require('express')
const router = express.Router()

const appProducts = require('../models/shoprHereProducts');


router
.route('/')
.get(async (req,res)=>{
    let products=[];
    products=await appProducts.find({});
    return res.status(200).json({message:'List of products',data:products,result:true})
})
.post((req,res)=>{
    const {productName,productPrice,categoryName,productDescription,productImageUrl}=req.body;
    const newProduct= new appProducts({productName,productPrice,categoryName,productImageUrl,productDescription});
    newProduct.save();
    return res.status(200).json({message:'Product added successfully',data:{newProduct},result:true})
})


module.exports = router
