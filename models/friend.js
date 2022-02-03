//Library Imports
const jwt = require("jsonwebtoken");
//Local Imports
const { pool } = require("../config/db");
//SendRequest
module.exports.sendRequest = function (from_user, to_user) {};
//AcceptRequest
module.exports.acceptRequest = function (request_id) {};
//RejectRequest
module.exports.rejectRequest = function (request_id) {};
//getAllFriends
module.exports.getAllFriends = function (username) {};
//getMutualFriends
module.exports.getMutualFriends = function (username) {};
