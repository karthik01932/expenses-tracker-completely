const express = require('express');

const userController = require('../controllers.js/expensetracker');

const router = express.Router();

router.post('/signup', userController.postUsers);

module.exports = router;