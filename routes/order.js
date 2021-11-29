var express = require('express');
var {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");
//const CryptoJS = require("crypto-js");
var Order = require('../backend/Orders');
var router = express.Router();

// to create order
router.post("/", verifyToken, async function(req,res){
    var newOrder = new Order(req.body);

    try{
        var savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
});

//to update order
router.put("/:id",verifyTokenAndAdmin, async function(req, res, customers){
    try{
        var updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{new:true}
        );

        res.status(200).json(updatedOrder);

    }catch(err){
        res.status(500).json(err);
    }
});

//to delete order
router.delete("/:id",verifyTokenAndAdmin, async function(req,res){
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted!");
    }catch(err){
        res.status(500).json(err);
    }
});

// to get user orders
router.get("/find/:userID", verifyTokenAndAuthorization, async function(req,res){
    try{
        var Order = await Order.find({userID:req.params.userID});
        res.status(200).json(Order);
    }catch(err){
        res.status(500).json(err);
    }
});

//to get all user orders
router.get("/", verifyTokenAndAdmin, async function(req,res){
    try{
        var Orders = await Order.find();
        res.status(200).json(Orders);
    }catch(err){
        res.status(500).json(err);
    }
});

//to get monthly income
router.get("/income",verifyTokenAndAdmin,async function(req,res){
    var date = new Date();
    var lastMonth = new Date(date.setMonth(date.getMonth()-1))
    var previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

    try {
        var income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"},
                },
            },
        ]);
        res.status(200).json(income);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
