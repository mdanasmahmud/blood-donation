const HttpError = require('../models/http-error')

const BloodDoner = require('../models/blood-donor-model')



const getAllDoners = async (req, res, next) => {
    let donors;
    try {
        donors = await BloodDoner.find({});
    } catch (err) {
        const error = new HttpError(
            'Fetching donors failed, please try again later', 500
        );
        return next(error);
    }

    res.json({donors: donors.map(donor => donor.toObject({ getters: true }))});
};

const getDonersbyId = async (req, res, next) => {
    const donorId = req.params.user_id;

    let donor;
    try {
        donor = await BloodDoner.findOne({ user_id: donorId });
    } catch (err) {
        const error = new HttpError(
            'Fetching donor failed, please try again later', 500
        );
        return next(error);
    }

    if (!donor) {
        const error = new HttpError(
            'Could not find a donor for the provided id.', 404
        );
        return next(error);
    }

    res.json({donor: donor.toObject({ getters: true })});
}

// if someone wants to be a blood doner

const postBloodDoner = async (req, res, next) => {

    const {user_id, donorName, blood_group} = req.body;

    const newBloodDoner = new BloodDoner({
        user_id,
        donorName,
        blood_group
    })

    try{
        await newBloodDoner.save();
    } catch (err) {
        const error = new HttpError(
            "Creating blood doner failed", 500
        )
        return next(error)
    }

    res.status(201).json(newBloodDoner)
}

// A user can opt out from being a blood doner and it will delete their entry

const deleteBloodDoner = async (req, res, next) => {
    const {user_id} = req.body;

    let donor;
    try {
        donor = await BloodDoner.findOne({ user_id: user_id });
    } catch (err) {
        const error = new HttpError(
            'Fetching donor failed, please try again later', 500
        );
        return next(error);
    }

    if (!donor) {
        const error = new HttpError(
            'Could not find a donor for the provided id.', 404
        );
        return next(error);
    }

    try {
        await donor.remove();
    } catch (err) {
        const error = new HttpError(
            'Deleting donor failed, please try again later', 500
        );
        return next(error);
    }

    res.status(201).json({message: 'Deleted donor.'});
}

exports.getAllDoners = getAllDoners
exports.getDonersbyId = getDonersbyId
exports.postBloodDoner = postBloodDoner
exports.deleteBloodDoner = deleteBloodDoner