const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectedRoute = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password'); //token has signed id of user (see generateToken() of userController)
            next();
        } catch (error) {
            return res.status(401).json({"error": "not authorized"})
        };
    } else {
        return res.status(401).json({"error": "no authorization provided"})
    };

    if(!token){
        return res.status(401).json({"error": "not authorized -- no token"})
    };
};

module.exports = protectedRoute;