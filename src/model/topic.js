const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const topic = mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    topicName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('topic', topic);