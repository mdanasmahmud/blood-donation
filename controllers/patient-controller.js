const { v4: uuidv4 } = require('uuid');

const Patient = require('../models/patient-model')

const HttpError = require('../models/http-error')

  const getAllPatientDetails = async (req, res, next) => {
    try {
        const patients = await Patient.find();
        res.json({patients});
    } catch (err) {
        const error = new HttpError(
            "Fetching patients failed", 500
        )
        return next(error);
    }
}

const getPatientbyId = async (req, res, next) => {
    const patientId = req.params.patient_id;
    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            throw new HttpError("Patient by the id not found", 404);
        } else {
            res.json({patient});
        }
    } catch (err) {
        const error = new HttpError(
            "Fetching patient failed", 500
        )
        return next(error);
    }
}

// Any user can post a patient 

const postPatientDetails = async (req, res, next) => {
    const {userPosted, patientName, patientBloodGroup, patientLocation, patientContact} = req.body;

    const newPatientDetails = new Patient({
        userPosted,
        patientName,
        patientBloodGroup,
        patientLocation,
        patientContact
    })

    try{
        await newPatientDetails.save()
    } catch (err) {
        const error = new HttpError(
            "Creating blood doner failed", 500
        )
        return next(error)
    }

    res.status(201).json(newPatientDetails)
}

const updatePatientDetails = async (req, res, next) => {
    const {patient_id, patientLocation, patientContact} = req.body;
    try {
        const patient = await Patient.findById(patient_id);
        if (!patient) {
            throw new HttpError("Patient by the id not found", 404);
        } else {
            patient.patientLocation = patientLocation;
            patient.patientContact = patientContact;
            await patient.save();
            res.status(201).json({patient});
        }
    } catch (err) {
        const error = new HttpError(
            "Updating patient failed", 500
        )
        return next(error);
    }
}


exports.getAllPatientDetails = getAllPatientDetails
exports.getPatientbyId = getPatientbyId
exports.postPatientDetails = postPatientDetails
exports.updatePatientDetails = updatePatientDetails