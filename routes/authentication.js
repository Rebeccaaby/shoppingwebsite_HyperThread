var express = require('express');
var router = express.Router();
var Customer = require('../backend/customers');
var CryptoJS = require('crypto-js'); //to encrypt and decrypt the password
var jwt = require('jsonwebtoken'); // to authenticate and use it to create access only for the admin to see all details

//To register
router.post("/register", async function(req,res){
    var newCustomer = new Customer({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password, "Secret Password").toString(),   // using cryptojs to encrypt
    });

    try{
        var savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
        //console.log(savedCustomer);
    }catch(err){
        //console.log(err);
        res.status(500).json(err);
    }
});

// To login and register
router.post('/login', async function(req,res){
    try{
        var customer = await Customer.findOne({username:req.body.username});
        !customer && res.status(401).json("Wrong username!");

        var encryptedPassword = CryptoJS.AES.decrypt(customer.password,"Secret Password"); // decrypt the password
        var orginialPassword = encryptedPassword.toString(CryptoJS.enc.Utf8);

        (orginialPassword !== req.body.password) && res.status(401).json("Wrong password!");

        var accessToken = jwt.sign({
            id : customer._id,
            isAdmin: customer.isAdmin,
        },
            "RebeccaAbraham21",
            {expiresIn: "3d"}
        );

        var {password, ...others} = customer._doc;

        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;