const express = require('express')
const checkAuth = require('../middleware/check-auth')

const usersController = require("../controllers/users-controller")

const router = express.Router();

router.post('/loginUser', usersController.loginUser)

router.post('/submitUser', usersController.postUser)

router.patch('/updateUser', usersController.updateUser)

router.use(checkAuth)

router.get('/:user_id', usersController.getUserById);

router.patch('/updateUserMedicalProfile/:user_id', usersController.updateUserMedicalProfile);

router.patch('/updatePersonalProfile/:user_id', usersController.updatePersonalProfile);

module.exports = router;