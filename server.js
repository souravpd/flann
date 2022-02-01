//Library Imports
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv').config();

//Local Imports
const db = require('./config/db');

//Define Router Files
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

//Define Port
const port = process.env.PORT;
//Create Express App
const app = express();

//Parse Incoming Form Data
app.use(express.urlencoded());
//Use Static Assets
app.use(express.static('./assets'));
app.use(expressLayouts);

// extract style and scripts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Setup View Engine
app.set('view engine', "ejs");
app.set('views', path.join(__dirname, 'views'));

//Define Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

//Create the Server
app.listen(port, function (err) {
    if (err) {
        console.err(`Error in starting the server ${err}`);
    } else {
        console.log(`Server is running on port ${port}`);
    }
});