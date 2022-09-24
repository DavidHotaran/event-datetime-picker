const Event = require('../models/eventModel');
const Response = require('../models/responseModel');
const User = require('../models/userModel');

// GET /api/event/:id
const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            return res.json(event);
        } else {
            return res.json({ "message": "event with that id not found" });
        }
    } catch (e) {
        res.status(401).json({ "error": e.toString() });
    };
};

// POST /api/event
const createEvent = async (req, res) => {
    const event = req.body;

    try {
        await Event.create({
            title: event.title,
            author: event.author,
            participants: event.participants,
            dateTime: event.dateTime,
        });
        res.json({ "message": "successfully saved event to DB" });
    } catch (e) {
        res.status(401).json({ "error": e.toString() });
    };
};

// PUT /api/event/:id
const updateEvent = async (req, res) => {
    try {
        await Event.findByIdAndUpdate(req.params.id, req.body);
        res.json({ "message": "successfully updated event" });
    } catch (e) {
        res.status(401).json({ "error": e.toString() })
    }
};

// DELETE /api/event/:id
const deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ "message": "successfully deleted event from DB" });
    } catch (e) {
        res.status(401).json({ "error": e.toString() });
    };
};

module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
};