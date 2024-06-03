const HttpError = require('../models/http-error')

const BloodDoner = require('../models/blood-donor-model')

const donorList = [
    {user_id: 0, donorName: 'Anas Mahmud', blood_group: 'A+'},
    {user_id: 1, donorName: 'John Doe', blood_group: 'B+'},
    {user_id: 2, donorName: 'Jane Smith', blood_group: 'O+'},
    {user_id: 3, donorName: 'Emma Johnson', blood_group: 'AB+'},
    {user_id: 4, donorName: 'Robert Brown', blood_group: 'A-'},
    {user_id: 5, donorName: 'Olivia Davis', blood_group: 'B-'},
    {user_id: 6, donorName: 'William Miller', blood_group: 'O-'},
    {user_id: 7, donorName: 'Emily Wilson', blood_group: 'AB-'},
]

const getAllDoners = (req, res, next) => {
    res.json({donorList});
};

const getDonersbyId = (req, res, next) => {
    const bloodDonorId = Number(req.params.user_id);
    const bloodDonor = donorList.find(p => {
        return p.user_id === bloodDonorId;
    })
    console.log('user requested get');

    if(!bloodDonor){
        throw new HttpError('Donor with the id not found');
    }
    else{
        res.json({bloodDonor});
    }
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

const deleteBloodDoner = (req, res, next) => {
    const {user_id} = req.body;

    const donorIndex = donorList.findIndex(d => d.user_id === user_id);

    donorList.splice(donorIndex, 1);

    res.status(201).json({message: 'Deleted donor.'});

}

exports.getAllDoners = getAllDoners
exports.getDonersbyId = getDonersbyId
exports.postBloodDoner = postBloodDoner
exports.deleteBloodDoner = deleteBloodDoner