const mongoose = require('mongoose');

// Ensure you have defined your mongoURL variable
const mongoURL = 'mongodb://localhost:27017/hotels'; // Replace with your actual connection string

// Connect to MongoDB without deprecated options
mongoose.connect(mongoURL);

// Get the connection instance
const db = mongoose.connection;

// Event listeners for the database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (error) => {
    console.error('MongooseDB connection error:', error); // Changed to console.error for error logging
});

db.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Export the database connection
module.exports = db;
