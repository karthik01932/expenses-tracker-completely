const UserSign = require('../models.js/expensetracker');

exports.postUsers = async (req,res,next)=>{
    try {
        const name = req.body.name;
        const email = req.body.email;
        const number = req.body.number;
        const password = req.body.password;

        let user = await UserSign.findOne({ where: {email: email}});
        if(user){
            console.log('user already exists');
            return res.status(500).json({message:"User already exists"})
                       
        }else{
            const newUser = await  UserSign.create({
                name : name ,  
                email : email ,
                number: number,
                password: password
            });
    
            return res.status(201).json(newUser);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await UserSign.findAll({ where: { email } });
 
        if(user.length > 0){
            if(user[0].password === password){
                res.status(201).json({success: true, message: 'Successfully logged in'});
            }else{
                return res.status(400).json({success: false, message: 'Wrong password.'});
            }
        } else {
            return res.status(404).json({success: false, message: 'user does not exists'});
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error, success: false});
    }
}