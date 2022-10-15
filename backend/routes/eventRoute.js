const express = require('express');
const router = express.Router();
const { getEvent, createEvent, deleteEvent, updateEvent, getAllEventsForUser } = require('../controllers/eventController');
const protectedRoute = require('../middleware/authMiddleware');

router.use('*', (req, res, next) => {
    console.log(`In eventRouter METHOD=${req.method} ENDPOINT=${req.originalUrl}`, "PARAMS=", req.params);
    next();
});

router.get('/', protectedRoute, getAllEventsForUser);
router.get('/:id', getEvent);
router.post('/', protectedRoute, createEvent);
router.delete('/:id', protectedRoute, deleteEvent);
router.put('/:id', protectedRoute, updateEvent);

module.exports = router;