const { v4: uuidv4 } = require('uuid');

const User = require('../models/user-model')

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

const postUser = async (req, res, next) => {
    const {userName, password, email} = req.body;

    // Set this up in later for mongodb

    // const existingUser = users.find(u => u.email === email);

    // if (existingUser) {
    //     throw new HttpError('User with this email already exists', 409);
    // }

    const newUser = new User ({
        userName,
        password,
        email
    })

    try{
        await newUser.save()
    } catch (err) {
        const error = new HttpError(
            "Creating blood doner failed", 500
        )
        return next(error)
    }

    res.status(201).json(newUser)
}

const updateUser = (req, res, next) => {
    const {user_id, userName, password, email} = req.body

    const userIndex = users.findIndex(n => n.user_id === user_id)

    const existingUser = users.find(u => u.email === email && u.user_id !== user_id);

    if (existingUser) {
        throw new HttpError('User with this email already exists', 409);
    }

    users[userIndex].userName = userName
    users[userIndex].password = password
    users[userIndex].email = email

    res.status(201).json({message: "User update successfull"})
}

const loginUser = (req, res, next) => {
    const {email, password} = req.body;

    const identifiedUser = users.find(u => u.email === email && u.password === password);

    if (!identifiedUser) {
        throw new HttpError('Could not identify user, credentials seem to be wrong', 401);
    }

    res.json({message: 'Logged in!'});
}

exports.getUserById = getUserById
exports.postUser = postUser
exports.updateUser = updateUser
exports.loginUser = loginUser