import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();


/* ========= Config ========= */
cloudinary.config({
    cloud_name: 'decau6fvv',
    api_key: '611843135895946',
    api_secret: 'SExXWa9ddmpJoHoBJwP_z8GESdk'
});


/* ========= Upload Image ========= */
const cloudinaryUploadImage = async (imagePath) => {
    try {
        const data = await cloudinary.uploader.upload(imagePath, {
            resource_type: "auto"
        });
        return data;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error; // Throw the error to be handled in the caller function
    }
};

/* ========= Remove Image ========= */
const cloudinaryRemoveImage = async (imagePublicId) => {
    try {
        const data = await cloudinary.uploader.destroy(imagePublicId);
        return data;
    } catch (error) {
        console.error("Cloudinary remove error:", error);
        throw error; // Throw the error to be handled in the caller function
    }
};

export {
    cloudinaryRemoveImage,
    cloudinaryUploadImage
};
