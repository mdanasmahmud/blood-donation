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

const getPatientbyUserPosted = async (req, res, next) => {
    const {userPosted} = req.body;

    let userPatients;

    try{
        userPatients = await Patient.find({userPosted: userPosted})
    }
    catch (err) {
        console.log('I am here')
        const error = new HttpError(
            'Fetching patients failed', 500
        )
        return next(error)
    }

    

    res.json({userPatients: userPatients.map(patient => patient.toObject({ getters: true }))});
}

// Any user can post a patient 

const postPatientDetails = async (req, res, next) => {
    const { userPosted, patientName, patientBloodGroup, patientLocation, patientContact, blood_donors } = req.body;

    const newPatientDetails = new Patient({
        userPosted,
        patientName,
        patientBloodGroup,
        patientLocation,
        patientContact,
        blood_donors: blood_donors || [] // Default to an empty array if not provided
    });

    try {
        await newPatientDetails.save();
    } catch (err) {
        console.error("Error saving patient details:", err); // Log the error
        const error = new HttpError(
            "Creating patient failed", 500
        );
        return next(error);
    }

    res.status(201).json(newPatientDetails);
};


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

const deletePatientDetails = async (req, res, next) => {
    const { patient_id } = req.body;
    try {
        const patient = await Patient.findById(patient_id);
        if (!patient) {
            
            throw new HttpError("Patient by the id not found", 404);
        } else {
            
            await Patient.deleteOne({ _id: patient_id });
            console.log('I am here')
            res.status(200).json({ message: "Patient deleted successfully" });
        }
    } catch (err) {
        console.error(err);
        const error = new HttpError(
            "Deleting patient failed", 500
        )
        return next(error);
    }
}

const addDonorDetails = async (req, res, next) => {
    const patientId = req.params.id;
    const { donorUserID, donorName, donorBloodGroup, donorPhone, DonorEligible } = req.body;

    const newDonor = {
        donorUserID,
        donorName,
        donorBloodGroup,
        donorPhone,
        DonorEligible
    };

    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        patient.blood_donors.push(newDonor);
        await patient.save();
        res.status(201).json({ message: "Donor details added" });
    } catch (err) {
        console.error("Error adding donor details:", err.message); // Log the error message
        const error = new HttpError("Adding donor details failed", 500);
        return next(error);
    }
};


exports.deletePatientDetails = deletePatientDetails;


exports.getAllPatientDetails = getAllPatientDetails
exports.postPatientDetails = postPatientDetails
exports.updatePatientDetails = updatePatientDetails
exports.getPatientbyUserPosted = getPatientbyUserPosted
exports.addDonorDetails = addDonorDetails