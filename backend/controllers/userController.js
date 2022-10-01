const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// GET /api/user/:id
const getUser = async (req, res) => {

    if (!req.user) {
        return res.status(401).json({ "message": "user not found" })
    };

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.json({ "error": "User not found" });
        };

        res.status(200).json({ "user": user });
    } catch (e) {
        res.status(401).json({ "error": e.toString() });
    };
};

// POST /api/user
const createUser = async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({ "error": "please add all required fields" });
    }

    try {
        const userExisits = await User.findOne({ email });

        if (userExisits) {
            return res.status(400).json({ "error": "user already exists" });
        }

    } catch (error) {
        return res.status(500).json({ "error": "error trying to find user" });
    };

    try {
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ userName, email, password: hasedPassword });

        if (user) {
            const token = generateToken(user._id);
            return res.status(201).json({ "message": "successfully created user", "token": token });
        };

    } catch (error) {
        return res.json({ "error": "error trying to create user" });
    };


};

// POST /api/user/login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (user && passwordMatch) {
            const token = generateToken(user._id);
            return res.json({ "message": "successfully logged in user", "token": token });
        } else {
            return res.json({ "error": "invalid credentials" });
        };
    } catch (error) {
        res.status(400).json({ "error": "error trying to find user and login" });
    };
};

// PUT /api/user/:id
const updateUser = async (req, res) => {
    const { email, password, eventsCreated } = req.body;

    try {
        const user = await User.findOne({ email });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (user && passwordMatch) {
            await User.findOneAndUpdate({ email }, {
                eventsCreated,
            });
            return res.json({ "message": "successfully updated events!" });
        } else {
            return res.json({ "error": "invalid credentials" });
        };
    } catch (error) {
        res.status(400).json({ "error": "error trying to find user and update events" });
    };
};

// DELETE /api/user/:id
const deleteUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (user && passwordMatch) {
            await User.findOneAndDelete({ email });
            return res.json({ "message": "successfully deleted user" });
        } else {
            return res.json({ "error": "invalid credentials" });
        };
    } catch (error) {
        res.status(400).json({ "error": "error trying to find user and delete" });
    };
};

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' },
    );
};

module.exports = {
    getUser,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
};