const HttpError = require('../models/http-error')

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

exports.getAllDoners = getAllDoners
exports.getDonersbyId = getDonersbyId