//Library Imports
const express = require('express');
//Local Imports
const usersController = require("../controllers/users_controller");

//Create Router
const router = express.Router();

//Define Routes
router.post('/signUp', usersController.signUp);
router.post('/login', usersController.login);

//Exports
module.exports = router;