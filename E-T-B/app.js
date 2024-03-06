const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');
const User = require('./models.js/expensetracker');
const Expense = require('./models.js/dailyexpenses')
const Order = require('./models.js/orders');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/expensetracker');
const userExpensesRoutes = require('./routes/dailyexpenses');
const purcahseRoutes = require('./routes/purchase');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(userRoutes);
app.use(userExpensesRoutes);
app.use('/purchase',purcahseRoutes)

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User); 


sequelize
    .sync()
    .then(result =>{
        // console.log(result)
        app.listen(3000);
        console.log("Server is running on port 3000");
    })
    .catch(err =>{  
        console.log(err);
    })
   