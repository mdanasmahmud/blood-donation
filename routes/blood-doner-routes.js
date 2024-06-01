const express = require('express')

const router = express.Router();

const bloodDonerController = require('../controllers/blood-doner-controller')

router.post('/submitBloodDonor', bloodDonerController.postBloodDoner)

router.get('/', bloodDonerController.getAllDoners);

router.get('/:user_id', bloodDonerController.getDonersbyId);

module.exports = router;
