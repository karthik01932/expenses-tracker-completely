const express = require('express');

const router  = express.Router();

const userExpensesController = require('../controllers.js/dailyexpenses');

router.post('/dailyexpenses', userExpensesController.postUsersExpenses);

router.get('/get-dailyexpenses', userExpensesController.getUsersExpenses);

router.delete('/delete-expenses/:id', userExpensesController.deleteExpenses);

module.exports = router;