import { DataTypes } from "sequelize";
import sequelize from "../../dbConnections/dbConnection.js";


const postModel = sequelize.define("post", {
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "title cannot be empty"
            }
        }
    },
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

    postPhoto: {
        type: DataTypes.STRING, // AssumingpostPhoto is a string (URL)
    },
    postPhotoPublicId: {
        type: DataTypes.STRING, // AssumingpostPhotoPublicId is a string (public ID)
        allowNull: true // Allow null as you might not have it initially
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    timestamps: true,
    paranoid: false
});




export default postModel;