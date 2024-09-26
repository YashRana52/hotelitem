const express = require('express');
require('dotenv').config();  // Load environment variables

const PORT = process.env.PORT || 3000;  // Default to 3000 if PORT is not set
const db = require("./db");  // Initialize and connect to the database
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// GET route for the home page
app.get("/", function (req, res) {
  res.send("Hello, welcome to our hotels");
});

// Import the router files
const menuItemsRoutes = require("./routes/menuItemsRoutes");
const personRoutes = require("./routes/personRoutes");

app.use("/person", personRoutes);
app.use("/menu", menuItemsRoutes);

// Check if the database is connected before starting the server
db.on('connected', () => {
  console.log("Successfully connected to MongoDB");

  // Start the server only after MongoDB connection is successful
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

db.on('error', (error) => {
  console.error("Failed to connect to MongoDB:", error);
});
