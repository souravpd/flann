//Library Imports
const jwt = require("jsonwebtoken");
//Local Imports
const { pool } = require("../config/db");
const { uid } = require("../utils/uid");

//SendRequest
module.exports.sendRequest = function ({
  from_user: from_user,
  to_user: to_user,
}) {
  return new Promise(async function (resolve, reject) {
    let request_id = uid();
    pool.query(
      `INSERT INTO friend_requests (from_user , to_user , friendship_status, request_id) VALUES(?,?,?,?)`,
      [from_user, to_user, "0", request_id],
      function (error) {
        if (error) {
          return reject(error);
        }
        return resolve("FriendRequest Sent");
      }
    );
  });
};
//AcceptRequest
module.exports.acceptRequest = function ({ request_id: request_id }) {};
//RejectRequest
module.exports.rejectRequest = function (request_id) {};
//getAllFriends
module.exports.getAllFriends = function (username) {};
//getMutualFriends
module.exports.getMutualFriends = function (username) {};
