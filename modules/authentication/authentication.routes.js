import { Router } from "express";
import validate from "../middlewares/validation.js";
import { signinValidation, signupValidation } from "../users/user.validaution.js";
import { signin, signup } from "./authentication.Controller.js";

const authenticationRouter = Router();

// Authentication routes
authenticationRouter.post('/signup', validate(signupValidation), signup);
authenticationRouter.post('/signin', validate(signinValidation), signin);



export default authenticationRouter;
