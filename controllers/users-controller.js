const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error')

const users = [
    {user_id: '0', userName: 'Anas Mahmud', password:'1234', email:'abid1234@gmail.com'},
    {user_id: '1', userName: 'John Doe', password:'4321', email:'johndoe1234@gmail.com'}
 ]

const getUserById = (req, res, next) => {
    const userId = (req.params.user_id);
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

// To create a new User by signup

const postUser = (req, res, next) => {
    const {userName, password, email} = req.body;

    const newUser = {
        user_id: uuidv4(),
        userName,
        password,
        email
    }

    users.unshift(newUser)

    res.status(201).json(newUser)
}

const updateUser = (req, res, next) => {
    const {user_id, userName, password, email} = req.body

    const userIndex = users.findIndex(n => n.user_id === user_id)

    users[userIndex].userName = userName
    users[userIndex].password = password
    users[userIndex].email = email

    res.status(201).json({message: "User update successfull"})
}

exports.getUserById = getUserById
exports.postUser = postUser
exports.updateUser = updateUser