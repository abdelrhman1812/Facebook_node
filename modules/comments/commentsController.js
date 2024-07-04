import commentModel from "../Tabels/commenttable.js";
import postModel from "../Tabels/postTable.js";
import userModel from "../Tabels/userTable.js";
import catchError from '../middlewares/catchError.js';


/* ==========  Add Comment ==========  */


const addComment = catchError(async (req, res) => {

    const { postId } = req.body
    const commenterId = req.user.userId

    const post = await postModel.findByPk(postId)

    const user = await userModel.findByPk(commenterId)
    if (!user || !post) {
        return res.status(400).json({ error: "post or user is not exists" });

    }
    await commentModel.create({ ...req.body, commenterId });
    res.status(201).json({ mes: "success add comment" })

})


/* ==========  update Comment ==========  */

const updateComment = catchError(async (req, res) => {

    const { id } = req.params
    const comment = await commentModel.findByPk(id)
    if (!comment) {
        return res.status(400).json({ error: "comment is not exists" });

    }
    await commentModel.update(req.body, { where: { id: id } });
    res.status(200).json({ mes: "success" ,comment:req.body });

})



/* ==========  Delete Comment ==========  */

const deleteComment = catchError(async (req, res) => {
    const { id } = req.params
    console.log(id)

    const comment = await commentModel.findByPk(id)
    if (!comment) {
        return res.status(400).json({ error: "comment is not exists" });

    }
    await commentModel.destroy({ where: { id: id } });
    res.status(200).json({ mes: "success deleted commet" });

})

/* ==========  Get All Comments ==========  */

const getAllComments = catchError(async (req, res) => {

    const comments = await commentModel.findAll()
    res.status(200).json({ message: "success", comments });

})
/* ==========  Get Specific Comment with post ==========  */

const getSpecificComment = catchError(async (req, res) => {

    const { id } = req.params;
    const comment = await commentModel.findByPk(id, {
        include: [
            {
                model: postModel,
            }
        ]
    });

    if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
    }

    res.status(200).json({ message: "Success", comment });

}
)




export {
    addComment, deleteComment, getAllComments, getSpecificComment, updateComment
};

