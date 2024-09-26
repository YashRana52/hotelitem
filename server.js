const express = require('express');



const db = require("./db");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// GET route for the home page
app.get("/", function (req, res) {
  res.send("Hello, welcome toour hotels");
});

//import the router files
const menuItemsRoutes = require("./routes/menuItemsRoutes");
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);
app.use("/menu", menuItemsRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
