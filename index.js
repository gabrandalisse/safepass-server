const express = require('express');
const dbConnect = require('./config/db');
const cors = require('cors');

// Creating the server
const app = express();

// Connect to the DataBase
dbConnect();

// Allow cors
app.use( cors() );

// Allow express.json
app.use(express.json({ extended: true }));

// Port of the app
const PORT = process.env.PORT || 4000;

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/passwords', require('./routes/passwords'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});