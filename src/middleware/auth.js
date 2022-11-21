const user= require('../model/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');




//authentication

exports.authentication = async function (req, res, next) {
    try {
        let token = req.header("Authorization");

        //checking token is present or not
        if (!token) {
            return res.status(400).send({ status: false, message: "login is required" });
        }

        let decodedToken = jwt.verify(token, "secret");
        if (!decodedToken) {
            return res.status(401).send({ status: false, message: "token is invalid" });
        }
        req.token = decodedToken.userId;
        next();
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



//authorization

exports.authorization = async function (req, res, next) {
    try {
        let userId = req.params.userId;

        //validation for given userId
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Enter valid userId" })
        }

        //Checking user exist or not
        let userInfo = await user.findById({ _id: userId })
        if (!userInfo) {
            return res.status(404).send({ status: false, message: "User does not exist" })
        }

        //Authorisation check
        if (req.token != userInfo._id) {
            return res.status(403).send({ status: false, message: "You are Unauthorise" })
        }
        next()
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

