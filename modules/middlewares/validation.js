


const validate = (schema) => {

    return (req, res, next) => {
        const { error } = schema.validate(req.body)
        if (!error) {
            next()
        } else {
            let errorMsg = error.details.map((err) => err?.message)
            res.json({ error: errorMsg })
        }
    }

}

export default validate