const express = require('express')

const usersController = require("../controllers/users-controller")

const router = express.Router();

router.post('/loginUser', usersController.loginUser)

router.patch('/updateUser', usersController.updateUser)

router.post('/submitUser', usersController.postUser)

router.get('/:user_id', usersController.getUserById);

module.exports = router;