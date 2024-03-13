const UserExpenses = require('../models.js/dailyexpenses');
const User = require('../models.js/expensetracker');
const sequelize = require('../utils/database');

exports.postUsersExpenses = async (req,res,next) => {
    const t = await sequelize.transaction();

    try{
        const catergory = req.body.catergory;
        const amount = req.body.amount;
        const description = req.body.description;

        const newExpenses = await  UserExpenses.create({
            catergory: catergory,
            amount: amount,
            description: description,
            userId: req.user.id

        },{transaction : t})
        const totalExpense = Number(req.user.totalExpenses)+Number(amount);
        console.log(totalExpense);
        
        await User.update({
            totalExpenses: totalExpense
        },{
            where: {id: req.user.id},
            transaction: t
        })
        await t.commit();
        res.status(201).json(newExpenses);
              
    }catch(err){
        await t.rollback();
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getUsersExpenses  = async  (req,res,next) => {
    try {
        const expensesData =  await UserExpenses.findAll({where: {userId: req.user.id}});
        console.log(req.user.id);

        console.log(expensesData);
        
        res.status(200).json({allExpenses: expensesData});
    } catch (error) {
        console.log(error)
        res.status(500).json(error)   
    }
}

exports.deleteExpenses = async function(req,res,next){
    const id  = req.params.id;
    const t = await sequelize.transaction();

    try{
        console.log(id);
        // const expenseid = await UserExpenses.findByPk(id)
        // const expenseamount = expenseid.amount;
     
        const data = await UserExpenses.destroy({where:{id:id , userId: req.user.id}});
        // const totalExpense = Number(req.user.totalExpenses) - Number(expenseamount)

        // await User.update({
        //     totalExpenses: totalExpense
        // },{
        //     where: { id: req.user.id },
        //     transaction: t
        // })
        // await t.commit();

        if(!data){
           return res.status(400).send("Failed to delete!");  
        }else{
            return res.status(200).send('Delete Successful');
        }
    }catch(error){
        // await t.rollback();
        console.log(err);
        res.status(500).json(error);
    }
};