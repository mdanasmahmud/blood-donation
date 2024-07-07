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

    const {user_id, donorName, blood_group, donorPhone, donorGeoLocation} = req.body;

    const newBloodDoner = new BloodDoner({
        user_id,
        donorName,
        blood_group,
        donorPhone,
        location: donorGeoLocation
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
    const user_id = req.params.user_id;

    let donor;
    try {
        donor = await BloodDoner.findOne({ user_id: user_id });
        console.log(`Donor found: ${donor}`);
    } catch (err) {
        console.error(`Error fetching donor: ${err.message}`);
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
        await donor.deleteOne();
        console.log(`Donor deleted: ${donor}`);
    } catch (err) {
        console.error(`Error deleting donor: ${err.message}`);
        const error = new HttpError(
            'Deleting donor failed, please try again later', 500
        );
        return next(error);
    }

    res.status(200).json({ message: 'Deleted donor.' });
}



const updateBloodDonorLocation = async (req, res, next) => {
    const { user_id, latitude, longitude } = req.body;

    let donor;
    try {
        donor = await BloodDoner.findOne({ user_id: user_id });
        if (!donor) {
            throw new HttpError('Could not find a donor for the provided id.', 404);
        }

        donor.location = [latitude, longitude];
        await donor.save();
    } catch (err) {
        if (err instanceof HttpError) {
            return next(err);
        }
        const error = new HttpError(
            'Updating donor location failed, please try again later', 500
        );
        return next(error);
    }

    res.status(200).json({ donor: donor.toObject({ getters: true }) });
};


exports.updateBloodDonorLocation = updateBloodDonorLocation;
exports.getAllDoners = getAllDoners
exports.getDonersbyId = getDonersbyId
exports.postBloodDoner = postBloodDoner
exports.deleteBloodDoner = deleteBloodDoner