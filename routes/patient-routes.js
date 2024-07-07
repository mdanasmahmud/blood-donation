const express = require('express')
const checkAuth = require('../middleware/check-auth')

const patientController = require('../controllers/patient-controller')

const router = express.Router();

router.get('/', patientController.getAllPatientDetails);

router.post('/addDonor/:id', patientController.addDonorDetails)

router.use(checkAuth)

// Only the user who posts about their patient can update or remove it



router.delete('/patientDelete', patientController.deletePatientDetails)

router.post('/patientUserPosted', patientController.getPatientbyUserPosted)

router.patch('/updatePatient', patientController.updatePatientDetails)

router.post('/submitPatient', patientController.postPatientDetails)


module.exports = router;