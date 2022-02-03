//Import Friend Model
const Friend = require("../models/friend");

//Controller Actions
//sendRequest
module.exports.sendRequest = async function (request, response) {
  let form_data = {
    from_user: request.body.username,
    to_user: request.body.to_user,
  };
  Friend.sendRequest(form_data)
    .then(function (results) {
      return response.status(200).json({
        success: true,
        error: null,
        results,
      });
    })
    .catch(function (error) {
      return response.status(400).json({
        success: false,
        error: error,
        results: null,
      });
    });
};
//AcceptRequest
module.exports.acceptRequest = function (request, response) {};
//RejectRequest
module.exports.rejectRequest = function (request, response) {};
//getAllFriends
module.exports.getAllFriends = function (request, response) {};
//getMutualFriends
module.exports.getMutualFriends = function (request, response) {};
