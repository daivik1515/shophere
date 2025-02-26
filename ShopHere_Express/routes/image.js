const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');
const Grid = require('gridfs-stream');


const conn = mongoose.connection;
let gfs, gridFSBucket;

conn.once('open', () => {
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log('GridFSBucket Initialized'); 
});


// GET: Display Image by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const file = await gfs.files.findOne({ _id: new mongoose.Types.ObjectId(id) });
        if (!file) return res.status(404).send('Image not found');

        const readStream = gridFSBucket.openDownloadStream(file._id);
        res.set('Content-Type', file.contentType);
        readStream.pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching image');
    }
});

router.get('/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        console.log(file);
        console.log(file.ObjectId);
        
        
      if (!file || file.length === 0) {
        return res.status(404).json({ err: 'No file exists' });
      }
  
      // Check if the file is an image
      if (
        file.contentType === 'image/jpeg' ||
        file.contentType === 'image/png' || 'image/jpg'
      ) {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({ err: 'Not an image' });
      }
    });
  });

  module.exports = router