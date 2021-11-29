var express = require('express');
var {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");
//const CryptoJS = require("crypto-js");
var ShoppingCart = require('../backend/Shoppingcart');
var router = express.Router();

// to create shopping cart
router.post("/", verifyToken, async function(req,res){
    var newShoppingCart = new ShoppingCart(req.body);

    try{
        var savedShoppingCart = await newShoppingCart.save();
        res.status(200).json(savedShoppingCart);
    }catch(err){
        res.status(500).json(err);
    }
});

//to update shopping cart
router.put("/:id",verifyTokenAndAuthorization, async function(req, res, customers){
    try{
        var updatedShoppingCart = await ShoppingCart.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{new:true}
        );

        res.status(200).json(updatedShoppingCart);

    }catch(err){
        res.status(500).json(err);
    }
});

//to delete shopping cart
router.delete("/:id",verifyTokenAndAuthorization, async function(req,res){
    try{
        await ShoppingCart.findByIdAndDelete(req.params.id);
        res.status(200).json("Shopping cart has been deleted!");
    }catch(err){
        res.status(500).json(err);
    }
});

// to get a user shopping cart
router.get("/find/:id", verifyTokenAndAuthorization, async function(req,res){
    try{
        var ShoppingCart = await ShoppingCart.findOne({userID:req.params.id});
        res.status(200).json(ShoppingCart);
    }catch(err){
        res.status(500).json(err);
    }
});

//to get all shopping carts
router.get("/", verifyTokenAndAdmin, async function(req,res){
    try{
        var ShoppingCarts = await ShoppingCart.find();
        res.status(200).json(ShoppingCarts);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
