const user = require('../model/user.js');
const validate = require('../validator/validation')
const jwt = require('jsonwebtoken');



//user creation 
exports.userCreated = async function (req, res) {
    try {
        let userData = req.body
        let { userName, password } = userData

        //Validating body
        if (Object.keys(userData).length === 0) {
            return res.status(400).send({ status: false, message: "Request Cannot Be Empty" })
        }

        //Validating userName
        if (!validate.isValid(userName)) {
            return res.status(400).send({ status: false, message: "userName is required" });
        }

        //Validating Password
        if (!validate.isValid(password)) {
            return res.status(400).send({ status: false, message: "password is required" })
        }

        if (!/^[A-Za-z\W0-9]{8,15}$/.test(password)) {
            return res.status(400).send({ status: false, message: "password should be 8 to 15 " })
        }

        //Checking userName is uniques or not
        let userInfo = await user.findOne({ userName })
        if (userInfo) {
            return res.status(409).send({ status: false, message: "userName already exist" })
        }

        const userCreated = await user.create(userData);
        return res.status(201).send({ status: true, message: 'Registration Successfull', data: userCreated });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};


//User login
exports.login = async function (req, res) {
    try {
        const data = req.body
        const { userName, password } = data

        //checking the user entered some data here
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please Enter UserName and Password" })
        }

        //Validating userName 
        if (!validate.isValid(userName)) {
            return res.status(400).send({ status: false, message: "Please enter userName" })
        }

        //Validating Password 
        if (!validate.isValid(password)) {
            return res.status(400).send({ status: false, message: "Please enter Password" })
        }

        //password check with Regex
        if (!/^[A-Za-z\W0-9]{8,15}$/.test(password)) {
            return res.status(400).send({ status: false, message: "password should be between 8 to 15" })
        }

        //Checking Credential
        const userInfo = await user.findOne({ userName, password })
        if (!userInfo) {
            return res.status(401).send({ status: false, message: "Invalid Credential" });
        }

        //JWT Token crearion
        const token = jwt.sign({
            userId: userInfo._id.toString(),
            project: "feynmanboardTask",
        }, "secret")

        //setting token in response header
        res.setHeader("Authorization", token);
        const output = {
            userId: userInfo._id,
            token: token
        }
        return res.status(200).send({ status: true, message: "logged in successfull", data: output })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
};
