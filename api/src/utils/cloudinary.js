const { v2 } = require('cloudinary')
require('dotenv').config();
const {
    CLOUDINARY_APIKEY,CLOUDINARY_NAME,CLOUDINARY_API_SECRET
  } = process.env;

  v2.config({ 
    cloud_name: CLOUDINARY_NAME, 
    api_key: CLOUDINARY_APIKEY, 
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
  });


  async function uploadImage( file ) {
    try {
      return await v2.uploader.upload(file,{
        folder:"posters"
      })


    } catch (error) {
        console.log(error)
    }
   
};
 async function deleteImage( url ) {
  try {
    return await v2.uploader.destroy(url)


  } catch (error) {
      console.log(error)
  }
 
};

module.exports= {uploadImage, deleteImage};



