import { Router } from "express";
import photoUpload from "../middlewares/photoUpload.js";
import verfiyToken from "../middlewares/verifyToken.js";
import uploadUserProfile, { getAllUser, getSpecificUser, getSpecificUserWithPosts } from "./users.controller.js";

const userRouter = Router()

userRouter.use(verfiyToken)
userRouter.get('/', getAllUser)
userRouter.get('/:id', getSpecificUser);
userRouter.get('/:id/posts', getSpecificUserWithPosts);
userRouter.post('/profile/upload', photoUpload.single('image'), uploadUserProfile);




export default userRouter