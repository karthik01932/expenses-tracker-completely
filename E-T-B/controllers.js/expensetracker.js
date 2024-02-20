const UserSign = require('../models.js/expensetracker');

exports.postUsers = async (req,res,next)=>{
    try {
        const name = req.body.name;
        const email = req.body.email;
        const number = req.body.number;
        const password = req.body.password;
        let user = await UserSign.findOne({ where: {email: email}});
        if(user){
            // document.body.innerHTML = document.body.innerHTML + "<h1> User already exists</h1>"

            // alert( "User already exists");
            console.log('user already exists');
            return res.status(400).json({message:"User already exists"})
            
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
    }
}