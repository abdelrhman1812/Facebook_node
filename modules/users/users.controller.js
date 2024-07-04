import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cloudinaryRemoveImage, cloudinaryUploadImage } from "../Cloudinary/cloudinary.js";
import commentModel from "../Tabels/commenttable.js";
import postModel from "../Tabels/postTable.js";
import userModel from "../Tabels/userTable.js";
import catchError from "../middlewares/catchError.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =============== get All =============== */
const getAllUser = catchError(async (req, res) => {

    const user = await userModel.findAll({
        include: {
            model: postModel
        }
    });

    res.status(200).json({ message: "Success", user })
})

/* =============== get Spcific User =============== */

const getSpecificUserWithPosts = catchError(async (req, res) => {
    const { id } = req.params;

    const user = await userModel.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: {
            model: postModel,
            include: commentModel,
            required: false,
            where: { deletedAt: null }
        }
    });


    res.status(200).json({ message: "Success", user });
})

/* =============== getUser =============== */

const getSpecificUser = catchError(async (req, res) => {
    const { id } = req.params;

    const user = await userModel.findByPk(id, {
        attributes: { exclude: ['password'] },

    });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Success", user });

})



/* =============== Upload User Profile =============== */


const uploadUserProfile = catchError(async (req, res) => {
    const userId = req.user.userId;

    // Find the user by their ID
    const user = await userModel.findByPk(userId);

    if (!user || !req.file) {
        return res.status(400).json({ error: 'No file uploaded or not find user' });
    }

    const imagePath = path.join(__dirname, `../image/${req.file.filename}`);
    const cloudinaryResult = await cloudinaryUploadImage(imagePath);


    // Check if the user already has a profile photo with a public_id
    if (user.profilePhotoPublicId !== null) {
        // Remove the existing profile photo from Cloudinary
        await cloudinaryRemoveImage(user.profilePhotoPublicId);
    }

    // Update user record with new profile photo data
    await userModel.update({
        profilePhoto: cloudinaryResult.secure_url, // Update profilePhoto with Cloudinary URL
        profilePhotoPublicId: cloudinaryResult.public_id // Update profilePhotoPublicId with Cloudinary public ID
    }, {
        where: { id: userId }
    });

    // Delete the temporary image file from the server
    fs.unlinkSync(imagePath);

    // Respond with success message and updated profile photo data
    res.status(200).json({
        message: "Successfully uploaded profile photo",
        profilePhoto: cloudinaryResult.secure_url,
        profilePhotoPublicId: cloudinaryResult.public_id
    });

})




export default uploadUserProfile;

export { getAllUser, getSpecificUser, getSpecificUserWithPosts };

