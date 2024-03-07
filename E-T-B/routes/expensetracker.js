const express = require('express');

const router = express.Router();

const userController = require('../controllers.js/expensetracker');


router.post('/signup', userController.postUsers);

router.post('/login', userController.postLogin);

module.exports = router;