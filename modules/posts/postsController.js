import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cloudinaryUploadImage } from '../Cloudinary/cloudinary.js';
import commentModel from "../Tabels/commenttable.js";
import postModel from "../Tabels/postTable.js";
import userModel from "../Tabels/userTable.js";
import catchError from '../middlewares/catchError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ==========  Add Post ==========  */

const addPost = catchError(async (req, res) => {

    let cloudinaryResult = {}; //that content  " secure_url & public_id "

    // Check if a file was uploaded
    if (req.file) {
        const imagePath = path.join(__dirname, `../image/${req.file.filename}`);
        // console.log(imagePath)

        // Upload the image to Cloudinary
        cloudinaryResult = await cloudinaryUploadImage(imagePath);
        // Delete the temporary image file from the server after successful upload
        fs.unlinkSync(imagePath);
    } else {
        console.error("No file uploaded");
    }



    // Create a new post object with merged data
    const postBody = {
        ...req.body, // Include all properties from req.body
        userId: req.user.userId,
        postPhoto: cloudinaryResult.secure_url || null, // Add Cloudinary secure_url or null to postBody
        postPhotoPublicId: cloudinaryResult.public_id || null // Add Cloudinary public_id or null to postBody
    };

    // Create a new post record in the database
    const createdPost = await postModel.create(postBody);

    res.status(200).json({
        message: "Successfully created post",
        post: createdPost
    });


})




/* ==========  update Post ==========  */

const updatePost = catchError(
    async (req, res) => {
        const { id } = req.params;
        const { body } = req;


        // Check if the post exists
        const post = await postModel.findByPk(id);
        if (!post) {
            return res.status(400).json({ error: "Post does not exist" });
        }

        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({ error: "Empty title or content" });
        }

        await postModel.update(body, { where: { id } });

        // Fetch the updated post
        const postUpdated = await postModel.findByPk(id);

        // Respond with the updated post
        res.status(200).json({ message: "Success", post: postUpdated });

    }
)

/* ==========  Delete Post ==========  */
const deletePost = catchError(async (req, res) => {
    const { id } = req.params;

    const post = await postModel.findByPk(id);
    if (!post || post.deletedAt !== null) {
        return res.status(400).json({ error: "Post does not exist" });
    }

    // Soft delete the post
    const deletedPost = await post.update({ deletedAt: new Date() });

    res.status(200).json({ message: "Post successfully deleted" });

})



/* ================  Get All Post  With Comment ================  */

const getAllPosts = catchError(async (req, res) => {
    const posts = await postModel.findAll({
        include: [
            {
                model: userModel,
                attributes: { exclude: ['password'] },

            },

            {
                model: commentModel,
                required: false,
                include: [
                    {
                        model: userModel

                    }
                ]
            }


        ]
    });

    return res.status(200).json({ message: "success", posts });

})


/* ================  Get Specific Post ================  */

const getSpecificPost = catchError(async (req, res) => {
    const { id } = req.params;

    const post = await postModel.findByPk(id, {
        // attributes: { exclude: ['password'] },
        include: [
            {
                model: userModel,
                attributes: { exclude: ['password'] }
            },
            {
                model: commentModel,
            },


        ]
    });

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: "Success", post });

})




export {
    addPost, deletePost, getAllPosts, getSpecificPost, updatePost
};

