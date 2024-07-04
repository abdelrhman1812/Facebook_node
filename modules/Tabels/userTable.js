import { DataTypes } from "sequelize";
import sequelize from "../../dbConnections/dbConnection.js";

const userModel = sequelize.define("user", {
    userName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Username cannot be empty"
            }
        }
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
            msg: "Email already exists"
        },
        validate: {
            notEmpty: {
                msg: "Email cannot be empty"
            },
            isEmail: {
                msg: "Invalid email format"
            }
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Password cannot be empty"
            }
        }
    },
    profilePhoto: {
        type: DataTypes.STRING, // Assuming profilePhoto is a string (URL)
        defaultValue: "https://res.cloudinary.com/decau6fvv/image/upload/v1718495057/pgcrgezb8op2ajyxy2qv.png"
    },
    profilePhotoPublicId: {
        type: DataTypes.STRING, // Assuming profilePhotoPublicId is a string (public ID)
        allowNull: true // Allow null as you might not have it initially
    }
}, { timestamps: false });

export default userModel;
