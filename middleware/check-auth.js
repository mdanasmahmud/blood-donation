const jwt = require('jsonwebtoken')

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS'){
        return next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Breaer Token'
        if(!token) {
            const error = new HttpError('Token not found', 401);
            return next(error);
        }


        const decodedToken = jwt.verify(token, 'asdasdasd'); // You need to delete this before uploading into backend
        req.userData = {user_id: decodedToken.user_id}
        next();
    }catch (err) {
        const error = new HttpError('failed checking for token', 401);
        return next(error);
    }

}