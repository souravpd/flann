//Library Imports
const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();

//Define Router Files
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

//Define Port
const port = process.env.PORT;
//Create Express App
const app = express();

//Parse Incoming Form Data
app.use(express.json());

//Define Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

//Create the Server
app.listen(port, function (err) {
  if (err) {
    console.err(`Error in starting the server ${err}`);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
