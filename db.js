const mongoose = require('mongoose');
require('dotenv').config();

// Ensure mongoURL is defined and not undefined or empty
const mongoURL = process.env.MONGODB_URL;

if (!mongoURL) {
    console.error("MongoDB URL is not defined in the .env file.");
    process.exit(1);  // Exit the process if the MongoDB URL is missing
}

// Connect to MongoDB with options to prevent deprecation warnings
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Successfully connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Get the connection instance
const db = mongoose.connection;

// Event listeners for the database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (error) => {
    console.error('MongooseDB connection error:', error);
});

db.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Handle graceful exit on process termination (SIGINT)
process.on('SIGINT', async () => {
    await db.close();
    console.log('Mongoose connection closed due to app termination');
    process.exit(0);
});

// Export the database connection
module.exports = db;
