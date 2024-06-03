const User = require('../models/user-model')

const HttpError = require('../models/http-error')

 const getUserById = async (req, res, next) => {
    const userId = req.params.user_id;

    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        const error = new HttpError(
            'Fetching user failed, please try again later', 500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            'Could not find a user for the provided id.', 404
        );
        return next(error);
    }

    res.json({user: user.toObject({ getters: true })});
}

// To create a new User by signup

const postUser = async (req, res, next) => {
    const {userName, password, email} = req.body;

    const existingUser = await User.findOne({email: email});
    if (existingUser) {
        throw new HttpError('User with this email already exists', 409);
    }

    const newUser = new User ({
        userName,
        password,
        email
    })

    try{
        await newUser.save()
    } catch (err) {
        const error = new HttpError(
            "Creating user failed", 500
        )
        return next(error)
    }

    res.status(201).json(newUser)
}

const updateUser = async (req, res, next) => {
    const {user_id, userName, password, email} = req.body

    try {
        const user = await User.findById(user_id);
        if (!user) {
            throw new HttpError("User by the id not found", 404);
        } else {
            const existingUser = await User.findOne({email: email, _id: {$ne: user_id}});
            if (existingUser) {
                throw new HttpError('User with this email already exists', 409);
            }
            user.userName = userName;
            user.password = password;
            user.email = email;
            await user.save();
            res.status(201).json({message: "User update successful"});
        }
    } catch (err) {
        const error = new HttpError(
            "Updating user failed", 500
        )
        return next(error);
    }
}

const loginUser = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const identifiedUser = await User.findOne({email: email, password: password});
        if (!identifiedUser) {
            throw new HttpError('Could not identify user, credentials seem to be wrong', 401);
        }
        res.json({message: 'Logged in!'});
    } catch (err) {
        const error = new HttpError(
            "Logging in failed", 500
        )
        return next(error);
    }
}

exports.getUserById = getUserById
exports.postUser = postUser
exports.updateUser = updateUser
exports.loginUser = loginUser