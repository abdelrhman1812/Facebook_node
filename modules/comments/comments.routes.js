import { Router } from "express";
import validate from "../middlewares/validation.js";
import verfiyToken from "../middlewares/verifyToken.js";
import commentValidaion from "./comments.validation.js";
import { addComment, deleteComment, getAllComments, getSpecificComment, updateComment } from "./commentsController.js";

const commentRouter = Router()
commentRouter.use(verfiyToken)

/* Add Comment */

commentRouter.post('/', validate(commentValidaion), addComment)

/* Update Comment */

commentRouter.put('/:id', updateComment)

/* Delete Comment */

commentRouter.delete('/:id', deleteComment)
commentRouter.get('/:id', getSpecificComment)
commentRouter.get('/', getAllComments)

export default commentRouter