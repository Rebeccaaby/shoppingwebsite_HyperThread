var express = require('express');
var router = express.Router();
var stripe = require('stripe')("sk_test_51JztsBD5U5jmu583xiWUMufHjZzlrGvX1bVYy4uIs00Jsa7B3ZPOoLOHJ9om06N0FMrEAol84rDQH6yPDQkWIIaI00Cbk2FipC");

router.post("/payment",function(req,res){
    stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount,
            currency:"usd"
        }, function(stripeError,stripeResponse){
            if(stripeError){
                res.status(500).json(stripeError);
            }else{

                res.status(200).json(stripeResponse);
            }
        }
    );
});



module.exports = router;