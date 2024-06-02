const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error')

const patientDetails = [
    {patient_id:0, userPosted:0, patientName:'John Mary', patientBloodGroup:'AB+', patientLocation:'Dhaka', patientContact:'01234567890'},
    {patient_id:1, userPosted:2, patientName:'Alice Smith', patientBloodGroup:'O-', patientLocation:'Chittagong', patientContact:'01987654321'},
    {patient_id:2, userPosted:1, patientName:'Robert Johnson', patientBloodGroup:'A+', patientLocation:'Khulna', patientContact:'01876543210'},
    {patient_id:3, userPosted:0, patientName:'Emily Davis', patientBloodGroup:'B-', patientLocation:'Rajshahi', patientContact:'01765432109'},
    {patient_id:4, userPosted:3, patientName:'Michael Brown', patientBloodGroup:'O+', patientLocation:'Barisal', patientContact:'01654321098'},
    {patient_id:5, userPosted:2, patientName:'Sarah Wilson', patientBloodGroup:'AB-', patientLocation:'Sylhet', patientContact:'01543210987'},
    {patient_id:6, userPosted:0, patientName:'David Taylor', patientBloodGroup:'A-', patientLocation:'Comilla', patientContact:'01432109876'},
    {patient_id:7, userPosted:0, patientName:'Sophia Moore', patientBloodGroup:'B+', patientLocation:'Rangpur', patientContact:'01321098765'},
    {patient_id:8, userPosted:0, patientName:'James Anderson', patientBloodGroup:'AB+', patientLocation:'Narayanganj', patientContact:'01210987654'},
    {patient_id:9, userPosted:0, patientName:'Olivia Thomas', patientBloodGroup:'O-', patientLocation:'Gazipur', patientContact:'01109876543'}
  ];

const getAllPatientDetails = (req, res, next) => {
    res.json({patientDetails});
}

const getPatientbyId = (req, res, next) => {
    const patientId = Number(req.params.patient_id);
    const patientOneId = patientDetails.find(p => {
        return p.patient_id === patientId;
    })
    if(!patientOneId){
        throw new HttpError("Patient by the id not found", 404)
    }
    else{
        res.json({patientOneId});
    }
    
}

// Any user can post a patient 

const postPatientDetails = (req, res, next) => {
    const {userPosted, newsDescription, patientName, patientBloodGroup, patientLocation, patientContact} = req.body;

    const newPatientDetails = {
        patient_id: uuidv4(),
        userPosted,
        patientName,
        patientBloodGroup,
        patientLocation,
        patientContact
    }

    patientDetails.unshift(newPatientDetails)

    res.status(201).json(newPatientDetails)
}

const updatePatientDetails = (req, res, next) => {
    const {patient_id, patientLocation, patientContact} = req.body

    const patientIndex = patientDetails.findIndex(n => n.patient_id === patient_id)

    patientDetails[patientIndex].patientLocation = patientLocation
    patientDetails[patientIndex].patientContact = patientContact

    res.status(201).json({patientDetails: patientDetails[patientIndex]})
}


exports.getAllPatientDetails = getAllPatientDetails
exports.getPatientbyId = getPatientbyId
exports.postPatientDetails = postPatientDetails
exports.updatePatientDetails = updatePatientDetails