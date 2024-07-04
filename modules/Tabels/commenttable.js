import { DataTypes } from "sequelize";
import sequelize from "../../dbConnections/dbConnection.js";


const commentModel = sequelize.define("comment", {


    content: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "content cannot be empty"
            }
        }
    },
    commenterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "commenterId cannot be empty"
            }
        }
    },





}, { timestamps: false })




export default commentModel;
