const User = require('../models.js/expensetracker');
const Expense = require('../models.js/dailyexpenses');
const sequelize = require('../utils/database');
const express = require('express');


exports.getUserLeaderBoard = async (req, res) => {
    try{
        const leaderBoardofusers = await User.findAll({
            attributes: ['id','name',[sequelize.fn('sum',sequelize.col( 'expenses.amount' )), 'total_cost']],
            include : [{
                model: Expense,
                attributes: []
            }],
            group:['users.id'],
            order: [[sequelize.col("total_cost"), "DESC"]]
            
        });
      
        res.status(200).json(leaderBoardofusers);
    
    } catch (err){
        console.log(err)
        res.status(500).json(err)
    }
}

