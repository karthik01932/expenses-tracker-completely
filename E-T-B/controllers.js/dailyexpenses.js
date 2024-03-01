const UserExpenses = require('../models.js/dailyexpenses');

exports.postUsersExpenses = async (req,res,next) => {
    try{
        const catergory = req.body.catergory;
        const amount = req.body.amount;
        const description = req.body.description;

        const newExpenses = await  UserExpenses.create({
            catergory: catergory,
            amount: amount,
            description: description
        })
        res.status(201).json(newExpenses);
        
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getUsersExpenses  = async  (req,res,next) => {
    try {
        const expensesData =  await UserExpenses.findAll();
        // console.log(expensesData);
        
        res.status(200).json({allExpenses: expensesData});
    } catch (error) {
        // console.log(error)
        res.status(500).json(error)   
    }
}

exports.deleteExpenses = async function(req,res,next){
    const id  = req.params.id;
    try{
        console.log(id);
        const data=await UserExpenses.destroy({where:{id:id}});
        if(!data){
           return res.status(400).send("Failed to delete!");  
        }else{
            return res.status(200).send('Delete Successful');
        }
    }catch(error){
        res.status(500).json(error);
    }
};