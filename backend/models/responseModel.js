const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    responses: [String],
    author: String,
},
    { timestamps: true }
);

module.exports = mongoose.model('Response', schema);
