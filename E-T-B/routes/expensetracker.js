const express = require('express');

const userController = require('../controllers.js/expensetracker');

const router = express.Router();

router.post('/signup', userController.postUsers);

router.post('/login', userController.postLogin);

module.exports = router;