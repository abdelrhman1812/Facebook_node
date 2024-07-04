import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { fileURLToPath } from 'url';
import userModel from "../Tabels/userTable.js";
import catchError from "../middlewares/catchError.js";


const __filename = fileURLToPath(import.meta.url);
/* =============== signup =============== */





const signup = catchError(async (req, res) => {

    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 8);
    }

    // Create a new user in the database
    const user = await userModel.create(req.body);
    return res.status(200).json({ mes: "success", user });

})

/* =============== signin =============== */

const signin = catchError(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }


    const user = await userModel.findOne({
        where: { email }
    });

    if (!user) {
        return res.status(400).json({ error: "Email does not exist" });
    }

    const match = bcrypt.compareSync(password, user.password);

    if (!match) {
        return res.status(400).json({ error: "Incorrect password" });
    }

    jwt.sign({ userId: user.id, name: user.userName },
        'ody', (err, token) => {
            return res.status(200).json({ message: "success", token, user });
        }
    )



})











export { signin, signup };



