const express = require('express')

const patientController = require('../controllers/patient-controller')

const router = express.Router();

router.patch('/updatePatient', patientController.updatePatientDetails)

router.post('/submitPatient', patientController.postPatientDetails)

router.get('/', patientController.getAllPatientDetails);

router.get('/:patient_id', patientController.getPatientbyId);

module.exports = router;