const HttpError = require('../models/http-error')

const users = [
    {user_id: 0, userName: 'Anas Mahmud', password:'1234', email:'abid1234@gmail.com'},
    {user_id: 1, userName: 'John Doe', password:'4321', email:'johndoe1234@gmail.com'}
 ]

const getUserById = (req, res, next) => {
    const userId = Number(req.params.user_id);
    const userOneId = users.find(p => {
        return p.user_id === userId;
    })
    if(!userOneId){
        throw new HttpError("User by the id not found", 404)
    }
    else{
        res.json({userOneId});
    }
    
}

exports.getUserById = getUserById