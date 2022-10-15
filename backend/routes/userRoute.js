const express = require('express');
const router = express.Router();
const { createUser, deleteUser, getUser, loginUser, updateUser } = require('../controllers/userController');
const protectedRoute = require('../middleware/authMiddleware');

router.use('*', (req, res, next) => {
    console.log(`In userRouter METHOD=${req.method} ENDPOINT=${req.originalUrl}`, "PARAMS=", req.params);
    next();
});

router.get('/', protectedRoute, getUser);
router.post('/', createUser);
router.post('/login', loginUser);
router.put('/:id', protectedRoute, updateUser);
router.delete('/', protectedRoute, deleteUser);

module.exports = router;