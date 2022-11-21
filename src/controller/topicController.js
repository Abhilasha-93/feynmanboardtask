const topic = require('../model/topic.js')
const validate= require('../validator/validation')


exports.addTopic = async function (req, res)  {
    try {
        let data = req.body;

        let { topicName, description } = data;

        //checking the user entered some data here
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Enter some data for topic Details" });
        }

        //Validating topic here
        if (!validate.isValid(topicName)) {
            return res.status(400).send({ status: false, message: "topic Name is required" });
        }

        //Validating description here
        if (!validate.isValid(description)) {
            return res.status(400).send({ status: false, message: "description is required" });
        }

        //topic creation here
        const addTopic = await topic.create(data)
        //const userCreated = await user.create(userData);
        return res.status(201).send({ status: true, message: "Topic added", data: addTopic })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
};


exports.dashboard = async function (req, res) {
    try {
        const topicInfo = await topic.find({ userId: req.params.userId })
        return res.status(200).send({ status: true, message: "Topic: ", data: topicInfo });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}





