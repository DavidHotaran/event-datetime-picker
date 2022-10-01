const express = require('express');
const app = express();
const PORT = 5000;
const events= require('./routes/eventRoute');
const user= require('./routes/userRoute');
const connectDB = require('./config/db');

require('dotenv').config();
connectDB();

app.use(express.json());
app.use('/api/event', events);
app.use('/api/user', user);

app.listen(PORT, () => console.log(`App started on port ${PORT}`));