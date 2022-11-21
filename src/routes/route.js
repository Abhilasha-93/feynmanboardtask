const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const userController = require('../controller/userController');
const topicController= require('../controller/topicController');



router.post('/register', userController.userCreated)
router.post('/login', userController.login)
router.post('/user/:userId/addtopic', auth.authentication, auth.authorization, topicController.addTopic)
router.get('/user/:userId/dashboard', auth.authentication, auth.authorization, topicController.dashboard)


module.exports = router; 