const mongoose=require('mongoose');
const Product=require('./models/products');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(()=>{
    console.log("Mongo Connection Open!!");
})
.catch(err=>{
    console.log("Oh No error!! Mongo Connection Error");
})


const seedProducts=[
    {
        name:'Fairy Eggplant',
        price:1.00,
        category:'vegetable',
        seedData:'uploads/',
    },
    {
        name:'Organic Goddess Melon',
        price:4.99,
        category:'fruit',
        seedData:'uploads/'
    },
    {
        name:'Organic Mini Seedless Watermelon',
        price:3.99,
        category:'fruit',
        seedData:'uploads/'
    },
    {
        name:'Organic Celery',
        price:1.50,
        category:'vegetable',
        seedData:'uploads/'
    }
]
Product.insertMany(seedProducts)
.then(res=>{
    console.log(res);
})
.catch(err=>{
    console.log(err);
})