import userModel from "../Tabels/userTable.js";

const checkEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log(email);
        const emailExist = await userModel.findOne({ email: email });
        console.log(emailExist);
        if (emailExist) {
            return res.status(409).json({ message: "Email already exists" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export default checkEmail;
