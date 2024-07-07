const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

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

    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError('Could not create user, please try again. Hash', 500)
        return next(error);
    }


    const newUser = new User ({
        userName,
        password: hashedPassword,
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

    let token;

    token = jwt.sign({userId: newUser.id}, 'asdasdasd', {expiresIn: '1h'}) // Edit or delete this when submitting online
 
    res.status(201).json({userId: newUser.id,token: token})
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
        const identifiedUser = await User.findOne({email: email});

        if (!identifiedUser) {
            throw new HttpError('Could not identify user, credentials seem to be wrong', 401);
        }

        const isValidPassword = await bcrypt.compare(password, identifiedUser.password);

        if (!isValidPassword) {
            throw new HttpError('Could not identify user, credentials seem to be wrong', 401);
        }

        let token;
        token = jwt.sign({userId: identifiedUser.id}, 'asdasdasd', {expiresIn: '1h'}) // Edit or delete this when submitting online


        res.json({userId: identifiedUser.id, token: token});
    } catch (err) {
        const error = new HttpError(
            "Logging in failed", 500
        )
        return next(error);
    }
}

const updatePersonalProfile = async (req, res, next) => {
    const userId = req.params.user_id; // Assuming the user ID is passed as a URL parameter
    const {first_name, last_name ,gender, birthdate, home_address, phone_number, emergency_phone_number } = req.body;

    console.log(first_name)

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            throw new HttpError('User not found', 404);
        }

        // Update the user's personal profile
        user.userProfile = [{
            userFirstName: first_name,
            userLastName: last_name,
            userGender: gender,
            userBirthdate: birthdate,
            userHomeAddress: home_address,
            userPhone: phone_number,
            userEmergencyPhone: emergency_phone_number
        }];

        // Save the updated user
        await user.save();
        res.status(200).json({ message: 'Personal profile updated successfully' });
    } catch (err) {
        const error = new HttpError('Updating personal profile failed, please try again.', 500);
        return next(error);
    }
};

const updateUserMedicalProfile = async (req, res, next) => {
    const userId = req.params.user_id; // Assuming the user ID is passed as a URL parameter
    const {
        blood_group,
        height,
        pre_existing_conditions,
        surgeries,
        blood_transfusion,
        smoke,
        drug_abuse,
        alcohol
    } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            throw new HttpError('User not found', 404);
        }

        // Update the user's medical profile
        user.userMedicalProfile = [{
            userBloodGroup: blood_group,
            userHeight: height,
            userPreExistingCondition: pre_existing_conditions,
            userPreExistingSurgeries: surgeries,
            userBloodTransfusion: blood_transfusion,
            userSmoke: smoke,
            userDrugAbuse: drug_abuse,
            userAlcohol: alcohol
        }];

        // Save the updated user
        await user.save();
        res.status(200).json({ message: 'Medical profile updated successfully' });
    } catch (err) {
        const error = new HttpError('Updating medical profile failed, please try again.', 500);
        return next(error);
    }
};

exports.getUserById = getUserById
exports.postUser = postUser
exports.updateUser = updateUser
exports.loginUser = loginUser
exports.updatePersonalProfile = updatePersonalProfile
exports.updateUserMedicalProfile = updateUserMedicalProfile