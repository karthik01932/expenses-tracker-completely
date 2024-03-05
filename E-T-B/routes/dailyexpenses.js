const express = require('express');

const router  = express.Router();

const userExpensesController = require('../controllers.js/dailyexpenses');
const userauthentication = require('../middleware/auth')

router.post('/dailyexpenses', userauthentication.authenticate, userExpensesController.postUsersExpenses);

router.get('/get-dailyexpenses', userauthentication.authenticate, userExpensesController.getUsersExpenses);

router.delete('/delete-expenses/:id', userauthentication.authenticate, userExpensesController.deleteExpenses);

module.exports = router;