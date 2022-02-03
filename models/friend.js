//Library Imports
const jwt = require("jsonwebtoken");
//Local Imports
const { pool } = require("../config/db");
//SendRequest
module.exports.sendRequest = function ({
  from_user: from_user,
  to_user: to_user,
}) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `INSERT INTO friend_requests (from_user , to_user , friendship_status) VALUES(?,?,?)`,
      [from_user, to_user, "0"],
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
