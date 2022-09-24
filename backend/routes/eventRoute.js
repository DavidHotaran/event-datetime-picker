const express = require('express');
const router = express.Router();
const { getEvent, createEvent, deleteEvent, updateEvent } = require('../controllers/eventController');

router.use('*', (req, res, next) => {
    console.log(`In eventRouter METHOD=${req.method} ENDPOINT=${req.originalUrl}`, "PARAMS=", req.params);
    next();
});

router.get('/:id', getEvent);
router.post('/', createEvent);
router.delete('/:id', deleteEvent);
router.put('/:id', updateEvent);

module.exports = router;