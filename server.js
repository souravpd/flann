//Library Imports
const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();

//Define Router Files
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const friendsRouter = require("./routes/friends");
const graphsRouter = require("./routes/graphs");
const postsRouter = require("./routes/posts");

//Define Port
const port = process.env.PORT;
//Create Express App
const app = express();

//Parse Incoming Form Data
app.use(express.json());

//Define Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/friends", friendsRouter);
app.use("/graphs", graphsRouter);
app.use("/posts", postsRouter);

//Create the Server
app.listen(port, function (err) {
  if (err) {
    console.err(`Error in starting the server ${err}`);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
