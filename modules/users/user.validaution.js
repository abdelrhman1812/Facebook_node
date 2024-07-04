import Joi from "joi"

const signupValidation = Joi.object({
    userName: Joi.string().min(3).max(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{3,40}$/)
})

const signinValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{3,40}$/)
})


export { signinValidation, signupValidation }

