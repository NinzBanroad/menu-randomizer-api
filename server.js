const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const app = express();

// Allow frontend requests
app.use(cors());

// Init Middleware
app.use(express.json());

//Connect to MongoDB Database
connectDB();

//Define Routes
app.use('/api/menu', require('./routes/menu'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
