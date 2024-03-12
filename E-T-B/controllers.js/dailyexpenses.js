const UserExpenses = require('../models.js/dailyexpenses');

exports.postUsersExpenses = async (req,res,next) => {
    try{
        const catergory = req.body.catergory;
        const amount = req.body.amount;
        const description = req.body.description;

        const newExpenses = await  UserExpenses.create({
            catergory: catergory,
            amount: amount,
            description: description,
            userId: req.user.id

        })
        const total_cost = Number(req.user.total_cost)+Number(amount);
        console.log(total_cost);
        //update the total cost of the user in database
        await req.user.updateOne({total_cost : total_cost})
        
        res.status(201).json({
            success: true,
            data: newExpenses
        });
        // res.status(201).json(newExpenses);
        
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getUsersExpenses  = async  (req,res,next) => {
    try {
        const expensesData =  await UserExpenses.findAll({where: {userId: req.user.id}});
        console.log(expensesData);
        
        res.status(200).json({allExpenses: expensesData});
    } catch (error) {
        console.log(error)
        res.status(500).json(error)   
    }
}

exports.deleteExpenses = async function(req,res,next){
    const id  = req.params.id;
    try{
        console.log(id);
        const data=await UserExpenses.destroy({where:{id:id , userId: req.user.id}});
        if(!data){
           return res.status(400).send("Failed to delete!");  
        }else{
            return res.status(200).send('Delete Successful');
        }
    }catch(error){
        res.status(500).json(error);
    }
};