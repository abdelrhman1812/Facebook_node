import Joi from "joi"

const commentValidaion = Joi.object({
    content: Joi.string().min(3).max(200).required(),
    postId: Joi.required(),
})

export default commentValidaion
