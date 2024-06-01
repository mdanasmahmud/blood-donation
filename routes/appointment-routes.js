const express = require('express')

const router = express.Router()

const appointmentsController = require('../controllers/appointments-controller')

// To get the appointment of that user only

router.get('/:appointmentUserId', appointmentsController.getAppointmentsbyUser);

module.exports = router;