import jwt from "jsonwebtoken";



const verfiyToken = async (req, res, next) => {
    let { token } = req.headers
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, 'ody', async (err, decoded) => {

        if (err) return res.status(401).json({ message: 'Invalid Token', err })

        req.user = decoded
        // console.log(decoded)


        next()
    })
}

export default verfiyToken