const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    eventsCreated: Number,
},
    { timestamps: true }
);

module.exports = mongoose.model('User', schema);
