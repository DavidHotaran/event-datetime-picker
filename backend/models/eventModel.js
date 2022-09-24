const mongoose = require('mongoose');
const Response = require('./responseModel').schema

const schema = new mongoose.Schema({
    title: String,
    author: String,
    participants: [String],
    dateTime: String,
    responses: [Response],
},
    { timestamps: true }
);

module.exports = mongoose.model('Event', schema);
