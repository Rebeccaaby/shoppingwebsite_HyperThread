var express = require('express');
var {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");
//const CryptoJS = require("crypto-js");
var Product = require('../backend/Product');
var router = express.Router();

// to create products
router.post("/", verifyTokenAndAdmin, async function(req,res){
    var newProduct = new Product(req.body);

    try{
        var savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});

//to update products
router.put("/:id",verifyTokenAndAdmin, async function(req, res, customers){
    try{
        var updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{new:true}
        );

        res.status(200).json(updatedProduct);

    }catch(err){
        res.status(500).json(err);
    }
});

//to delete product
router.delete("/:id",verifyTokenAndAdmin, async function(req,res){
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted!");
    }catch(err){
        res.status(500).json(err);
    }
});

// to get a product
router.get("/find/:id", async function(req,res){
    try{
        var product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
});

//to get all products
router.get("/", async function(req,res){
    var queryNew = req.query.new;
    var queryCategories = req.query.category;
    try{
        let products;
        if(queryNew){
            products = await Product.find().sort({createdAt:-1}).limit(1)
        }else if(queryCategories){
            products = await Product.find({
                categories:{
                    $in: [queryCategories],
                },
            });
        }else{
            products = await Product.find();
        }

        //var customers = query ? await Customer.find().sort({ _id:-1 }).limit(5)
           // : await Customer.find();

        res.status(200).json({products});
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
