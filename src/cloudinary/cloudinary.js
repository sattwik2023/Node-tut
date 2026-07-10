const cloudinary = require('cloudinary')
require('dotenv').config()

// Configuration
   cloudinary.config({ 
       cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
       api_key: process.env.CLOUDINARY_API_KEY, 
       api_secret: process.env.CLOUDINARY_API_SERCRET // Click 'API Keys' above to copy your API secret
   });
async function connectCloudinary(filename){

       const uploadResult = await cloudinary.uploader.upload(filename);
       return uploadResult;
}

module.exports = connectCloudinary