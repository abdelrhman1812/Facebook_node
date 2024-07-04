process.on('uncaughtException', (err) => { console.log('err in code', err) })

import cors from 'cors'
import express from 'express'
import sequelize from './dbConnections/dbConnection.js'
import commentModel from './modules/Tabels/commenttable.js'
import postModel from './modules/Tabels/postTable.js'
import userModel from './modules/Tabels/userTable.js'
import authenticationRouter from './modules/authentication/authentication.routes.js'
import commentRouter from './modules/comments/comments.routes.js'
import postsRouter from './modules/posts/posts.routes.js'
import userRouter from './modules/users/user.routes.js'
const app = express()
const port = process.env.PORT || 8000


app.use(cors());
app.use(express.json());
app.use('/auth', authenticationRouter)
app.use('/users', userRouter)
app.use('/posts', postsRouter)
app.use('/comments', commentRouter)


// استخدم إعدادات CORS
app.use(cors({
    origin: 'https://facebook-node-9sqd.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


/* Err Handel Routes */
app.use('*', (req, res, next) => {
    // res.status(404).json({ message: `route not found ${req.originalUrl}` })
    next(new Error(`route not found ${req.originalUrl}`)
    )
})

/* Err Handdilig */

app.use((err, req, res, next) => {
    res.status(401).json({ error: "error", message: err.message })
})



/* Models */
userModel.hasMany(postModel, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
postModel.belongsTo(userModel, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

userModel.hasMany(commentModel, {
    foreignKey: 'commenterId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
commentModel.belongsTo(userModel, {
    foreignKey: 'commenterId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

postModel.hasMany(commentModel, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
commentModel.belongsTo(postModel, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204
// }));


await sequelize.sync()


process.on('unhandledRejection', (err) => {
    console.log('error', err)

})
app.get('/', (req, res) => res.send('Abdelrhman Ali!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
