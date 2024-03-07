const User = require('../models.js/expensetracker');
const Expense = require('../models.js/dailyexpenses');
const sequelize = require('../utils/database');
const express = require('express');
const UserSign = require('../models.js/expensetracker');

exports.getUserLeaderBoard = async (req, res) => {
    try{
        const user = await User.findAll();
        const expenses = await Expense.findAll();
        const userAggregatedExpenses = {}
        expenses.forEach((expense) => {
            if(userAggregatedExpenses[expense.userId]){
                userAggregatedExpenses[expense.userId] = userAggregatedExpenses[expense.userId] + expense.amount
            }else{
                userAggregatedExpenses[expense.userId] = expense.amount;
            }
        })
        var userLeaderBoardDetails = [];
        user.forEach((user)=>{
            userLeaderBoardDetails.push({name: user.name, total_cost: userAggregatedExpenses[user.id] || null })
        })
        console.log(userLeaderBoardDetails);
        userLeaderBoardDetails.sort((a,b)=> b.total_cost - a.total_cost);
        res.status(200).json(userLeaderBoardDetails)
    
    } catch (err){
        console.log(err)
        res.status(500).json(err)
    }
}

