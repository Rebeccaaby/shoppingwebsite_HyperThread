var express = require('express');
var {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");
const CryptoJS = require("crypto-js");
var Customer = require('../backend/customers');
var router = express.Router();

/* GET users listing. */
// router.get('/user', function(req, res) {
//   res.send('respond with a resource');
// });
//
// router.post("/userpost",function(req,res){
//   var username = req.body.username;
//   console.log(username);
//   res.send("Worked!>>>Username is: "+ username);
// });

//to update
router.put("/:id",verifyTokenAndAuthorization, async function(req, res, customers){
    if(req.body.password){
        req.body.password= CryptoJS.AES.
        encrypt(req.body.password, "Secret Password")
            .toString();  // using cryptojs to encrypt
    }

    try{
        var updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },{new:true}
        );

        res.status(200).json(updatedCustomer);

    }catch(err){
        res.status(500).json(err);
    }
});

//to delete customer
router.delete("/:id",verifyTokenAndAuthorization, async function(req,res){
    try{
        await Customer.findByIdAndDelete(req.params.id);
        res.status(200).json("Customer has been deleted!");
    }catch(err){
        res.status(500).json(err);
    }
});

// to get customer
router.get("/find/:id",verifyTokenAndAdmin, async function(req,res){
    try{
        var customer = await Customer.findById(req.params.id);

        var {password, ...others} = customer._doc;
        res.status(200).json({others});
    }catch(err){
        res.status(500).json(err);
    }
});

//to get all customers
router.get("/",verifyTokenAndAdmin, async function(req,res){
    var query = req.query.new;
    try{
        var customers = query ? await Customer.find().sort({ _id:-1 }).limit(5)
            : await Customer.find();

        //var {password, ...others} = customers._doc;
        res.status(200).json({customers});
    }catch(err){
        res.status(500).json(err);
    }
});

//to get customer stats
router.get("/stats",verifyTokenAndAdmin, async function(req,res){
    var date = new Date();
    var lastYear = new Date(date.setFullYear(date.getFullYear()-1));

    try{

        var data = await Customer.aggregate([
            { $match: { createdAt: {$gte:lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt"},
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1},
                },
            }
        ]);
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
