var jwt = require('jsonwebtoken');

var verifyToken = function(req,res,next){
    var authHeader = req.headers.token;
    if(authHeader){
        var token = authHeader.split(" ")[1];
        jwt.verify(token,"RebeccaAbraham21",(err,customer)=>{
            if(err) res.status(403).json("Token is not valid!!");
            req.customer = customer;
            next();
        });
    }
    else{
        return  res.status(401).json("You are not authenticated!!")
    }
};

var verifyTokenAndAuthorization = function(req,res,next){
    verifyToken(req,res,()=>{
        if(req.customer.id === req.params.id || req.customer.isAdmin){
            next();
        }
        else{
            res.status(403).json("You do not have access to do that!!");
        }
    });
};

var verifyTokenAndAdmin = function(req,res,next){
    verifyToken(req,res,()=>{
        if(req.customer.isAdmin){
            next();
        }
        else{
            res.status(403).json("You do not have access to do that!!");
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};