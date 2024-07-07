const express = require('express')
const checkAuth = require('../middleware/check-auth')

const router = express.Router();

const bloodDonerController = require('../controllers/blood-doner-controller')

router.get('/', bloodDonerController.getAllDoners);

router.use(checkAuth)

router.get('/getDonorById/:user_id', bloodDonerController.getDonersbyId);

// Only the user who created a blood donor list can delete a their blood doner post

router.patch('/updateBloodDonorLocation', bloodDonerController.updateBloodDonorLocation)

router.delete('/deleteBloodDoner/:user_id', bloodDonerController.deleteBloodDoner)

router.post('/submitBloodDonor', bloodDonerController.postBloodDoner)

module.exports = router;
