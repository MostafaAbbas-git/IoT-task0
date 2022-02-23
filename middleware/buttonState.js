
const getSendStateMiddleware = async (req, res, next) => {
    try {
        req.buttonState = req.body.buttonState; //changed "const req" to just req.
        next();

    } catch (error) {
        res.status(401).send({
            error: 'NO SEND OUT'
        })
    }
};

module.exports = getSendStateMiddleware;