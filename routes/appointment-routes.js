const express = require('express')

const router = express.Router()

const appointmentsController = require('../controllers/appointments-controller')

// After the user submits their evaluation, there will be a post request to create an appointment

router.post('/submitAppointment', appointmentsController.postAppointmentbyUser)

// To get the appointment of that user only

router.get('/:appointmentUserId', appointmentsController.getAppointmentsbyUser);



module.exports = router;