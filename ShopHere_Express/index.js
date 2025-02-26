
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/products');
const Customer=require('./models/customer');
const Cart=require('./models/cart');
const appProducts = require('./models/shoprHereProducts');
const methodOverride = require('method-override');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const Grid = require('gridfs-stream');
const bodyParser = require('body-parser');
const AppProduct = require('./models/shoprHereProducts');

// const crypto = require('crypto');

// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const mongoURI = 'mongodb://127.0.0.1:27017/ShopHere';
mongoose.connect(mongoURI)
    .then(() => console.log('Mongo Connection Open!!'))
    .catch(err => console.log('Mongo Connection Error:', err));

const conn = mongoose.connection;
let gfs, gridFSBucket;

conn.once('open', () => {
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log('GridFSBucket Initialized'); 
});



// Multer Storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

const appProductRouter = require('./routes/appProducts')
app.use('/appProducts',appProductRouter)

const imageRouter = require('./routes/image')
app.use('/image',imageRouter)

// // Routes
// // GET: All products
// app.get('/products', async (req, res) => {
//     const products = await Product.find({});
//     res.render('products/index', { products });
// });

// // GET: New Product Form
// app.get('/products/new', (req, res) => {
//     res.render('products/new');    
// });

// // POST: Add New Product with Image
// app.post('/products', upload.single('image'), async (req, res) => {
//     const { name, price, category } = req.body;

//     // Check if file is uploaded
//     if (!req.file) {
//         return res.status(400).send('Image is required!');
//     }

//     try {
//         // Create an upload stream
//         const uploadStream = gridFSBucket.openUploadStream(req.file.originalname, {
//             contentType: req.file.mimetype,
//         });

//         // Write file buffer to GridFS
//         uploadStream.end(req.file.buffer);

//         uploadStream.on('finish', async function () {
//             // Fetch the uploaded file details
//             const files = await gfs.files.find().sort({ uploadDate: -1 }).limit(1).toArray();

//             if (!files || files.length === 0) {
//                 return res.status(500).send('File not saved in GridFS!');
//             }

//             const file = files[0]; // Get the latest uploaded file
//             console.log('Uploaded File ID:', file._id); // Debug log for ID

//             // Create and save product with image ID
//             const product = new Product({
//                 name,
//                 price,
//                 category,
//                 imageId: file._id // Attach image ID
//             });

//             await product.save();
//             res.redirect(`/products/${product.id}`);
//         });

//         uploadStream.on('error', (err) => {
//             console.error('Upload Stream Error:', err);
//             res.status(500).send('Upload Failed');
//         });
//     } catch (err) {
//         console.error('Error saving product:', err);
//         res.status(500).send('Error saving product');
//     }
// });



// // GET: Show Product by ID
// app.get('/products/:id', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     console.log(product)
//     console.log(req.params)
//     res.render('products/show', { product });
// });

// // GET: Edit Product Form
// app.get('/products/:id/edit', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     res.render('products/edit', { product });
// });

// // PUT: Update Product
// app.put('/products/:id', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
//     res.redirect(`/products/${product.id}`);
// });

// // DELETE: Remove Product and Image
// app.delete('/products/:id', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findByIdAndDelete(id);

//     if (product && product.imageId) {
//         await gridFSBucket.delete(new mongoose.Types.ObjectId(product.imageId));
//     }
//     res.redirect('/products');
// });


app.get('/getcustomercart/:id',async (req,res)=>{
    const requestId=req.params.id;
    const cartItems=await Cart.find({custId:requestId})
    .populate('productId')
    .populate('custId')
    .exec();
    // console.log(cartItems);
    return res.status(200).json({message:'Cart Products Retrieved',data:cartItems,result:true})
    
})

app.get('/', async (req, res) => {
    try {
      const files = await gfs.files.find().toArray();
      res.render('products/images', { files });
    } catch (err) {
      console.error(err);
      res.render('products/images', { files: [] });
    }
  });

//Delete the image
app.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      res.redirect('/');
    });
  });

//Register Customer
app.post('/register',async (req,res)=>{
    const {name,phoneNumber,password}=req.body;
    const customer=new Customer({name,phoneNumber,password});
    await customer.save();
    res.status(200).json({message:'User registered successfully',data:customer,result:true})
})

//Login Customer
app.post('/login',async (req,res)=>{
    const {name,password}=req.body;
    const customer = await Customer.findOne({name:name})
    
    if(!customer)
    {
        return res.status(200).json({message:'No such customer exist',data:{},result:false})
    }
    const _id=customer._id;
    if(password===customer.password)
        {
            res.status(200).json({message:'Login Successful',data:{name:customer.name,phoneNumber:customer.phoneNumber,_id:_id},result:true});
            return;
        } 
        else
        {
            console.log("Wrong Password");
            res.status(200).json({message:'Wrong Password',data:{},result:false})
            return;
        }
    })

app.post('/addtocart',async (req,res)=>{
    const {custId,productId,quantity}=req.body;
    const cartItemPresent=await Cart.findOne({custId:custId,productId:productId});
    if(cartItemPresent)
    {
        updatedQuantity=cartItemPresent.quantity+1;
        await Cart.updateOne({custId:custId,productId:productId},{ $set: { quantity: updatedQuantity } });
    }
    //const quantityUpdate=quantity++;
    else
    {
    const cart=new Cart({custId,productId,quantity});
    cart.save();
    }
    
    return res.status(200).json({message:'Product added to cart',data:{},result:true})
})


app.delete('/deletecartitem/:id',async (req,res)=>{
    const id=req.params.id;
    const deletedCartItem =await Cart.deleteOne({_id:id});
    return res.status(200).json({message:'Cart Item Deleted',data:deletedCartItem,result:true})
})
// Server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});