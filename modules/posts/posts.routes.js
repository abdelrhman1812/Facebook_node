import { Router } from "express";
import photoUpload from "../middlewares/photoUpload.js";
import verfiyToken from "../middlewares/verifyToken.js";
import { addPost, deletePost, getAllPosts, getSpecificPost, updatePost } from "./postsController.js";

const postsRouter = Router()

postsRouter.use(verfiyToken)
/*  Get All Posts*/

postsRouter.get('/', getAllPosts)

/*  Add Posts*/

postsRouter.post('/', photoUpload.single('image'), addPost)

/*  Update Posts*/

postsRouter.put('/:id', updatePost)

/*  Delete Posts*/

postsRouter.delete('/:id', deletePost)

/*  Get Specific Post*/

postsRouter.get('/:id', getSpecificPost)




export default postsRouter;