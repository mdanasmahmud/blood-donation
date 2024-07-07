const express = require('express')

const router = express.Router()

const checkAuth = require('../middleware/check-auth')

const appointmentsController = require('../controllers/appointments-controller')

router.post('/submitAppointment', appointmentsController.postAppointmentbyUser)

router.use(checkAuth)

router.patch('/updateAppointment', appointmentsController.updateAppointmentbyUser)

// After the user submits their evaluation, there will be a post request to create an appointment


// To get the appointment of that user only

router.get('/:appointmentUserId', appointmentsController.getAppointmentsbyUser);

module.exports = router;