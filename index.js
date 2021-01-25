const express = require('express');
const dbConnect = require('./config/db');

// Creating the server
const app = express();

// Connect to the DataBase
dbConnect();

// Allow express.json
app.use(express.json({ extended: true }));

// Port of the app
const PORT = process.env.PORT || 4000;

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});