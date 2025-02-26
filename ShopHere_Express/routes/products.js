const express = require('express')
const router = express.Router()
const multer = require('multer');

const mongoose = require('mongoose');
const Product = require('../models/products');



// Multer Storage
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Routes
// GET: All products
router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products });
});

// GET: New Product Form
router.get('/new', (req, res) => {
    res.render('products/new');    
});

// POST: Add New Product with Image
router.post('/', upload.single('image'), async (req, res) => {
    const { name, price, category } = req.body;

    // Check if file is uploaded
    if (!req.file) {
        return res.status(400).send('Image is required!');
    }

    try {
        // Create an upload stream
        const uploadStream = gridFSBucket.openUploadStream(req.file.originalname, {
            contentType: req.file.mimetype,
        });

        // Write file buffer to GridFS
        uploadStream.end(req.file.buffer);

        uploadStream.on('finish', async function () {
            // Fetch the uploaded file details
            const files = await gfs.files.find().sort({ uploadDate: -1 }).limit(1).toArray();

            if (!files || files.length === 0) {
                return res.status(500).send('File not saved in GridFS!');
            }

            const file = files[0]; // Get the latest uploaded file
            console.log('Uploaded File ID:', file._id); // Debug log for ID

            // Create and save product with image ID
            const product = new Product({
                name,
                price,
                category,
                imageId: file._id // Attach image ID
            });

            await product.save();
            res.redirect(`/products/${product.id}`);
        });

        uploadStream.on('error', (err) => {
            console.error('Upload Stream Error:', err);
            res.status(500).send('Upload Failed');
        });
    } catch (err) {
        console.error('Error saving product:', err);
        res.status(500).send('Error saving product');
    }
});



// GET: Edit Product Form
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product });
});

router
    .route('/:id')
    // GET: Show Product by ID
    .get(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show', { product });
})
    // PUT: Update Product
    .put(async (req, res) => {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
        res.redirect(`/products/${product.id}`);
})
    // DELETE: Remove Product and Image    
    .delete( async (req, res) => {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
    
        if (product && product.imageId) {
            await gridFSBucket.delete(new mongoose.Types.ObjectId(product.imageId));
        }
        res.redirect('/products');
})


module.exports = router