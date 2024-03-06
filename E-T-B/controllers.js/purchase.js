const Razorpay = require('razorpay');
const Order = require('../models.js/orders')
const userController = require('./expensetracker')


exports.purchasepremium =async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: 'rzp_test_Cy4rLAudTrzhwL',
            key_secret: '8OifnipcS1LshBybMLwyAvp3'
            // RAZORPAY_KEY_ID = 'rzp_test_Cy4rLAudTrzhwL'
            // RAZORPAY_KEY_SECRET = '8OifnipcS1LshBybMLwyAvp3'
        })
        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({ orderid: order.id, status: 'PENDING'}).then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});

            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Sometghing went wrong', error: err})
    }
}

exports.updateTransactionStatus = async (req, res ) => {
    try {
        const userId = req.user.id;
        const { payment_id, order_id} = req.body;
        const order  = await Order.findOne({where : {orderid : order_id}}) //2
        const promise1 =  order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}) 
        const promise2 =  req.user.update({ ispremiumuser: true }) 

        Promise.all([promise1, promise2]).then(()=> {
            return res.status(202).json({success: true, message: "Transaction Successful", token: userController.generateAccessToken(userId,undefined , true) });
        }).catch((error ) => {
            throw new Error(error)
        })

        
                
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: err, message: 'Something went wrong' })

    }
}
