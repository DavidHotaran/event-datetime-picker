const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userName: String,
    email: {type: String, unique: true},
    password: String,
    eventsCreated: Number,
},
    { timestamps: true }
);

module.exports = mongoose.model('User', schema);
