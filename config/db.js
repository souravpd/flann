//LIBRARY IMPORTS
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.DB_FILE_PATH , function(err){
    if(err){
        console.error("Error Connecting to the database");
    }else{
        console.log("Successfully Connected to the Database");
    }
});