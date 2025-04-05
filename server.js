const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const app = express();

// Allow frontend requests
// uncomment the line below to allow all origins (not recommended for production)
// app.use(cors());
app.use(
  cors({
    origin: 'https://menu-randomizer-ui.onrender.com', // Your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  })
);

// Init Middleware
app.use(express.json());

//Connect to MongoDB Database
connectDB();

//Define Routes
app.use('/api/menu', require('./routes/menu'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
