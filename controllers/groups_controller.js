const Group = require("../models/group");
//Controller Actions
module.exports.createGroup = async function (request, response) {
  let username = request.body.username;
  let group_name = request.body.group_name;
  Group.createGroup({ username: username, group_name: group_name })
    .then(function (results) {
      return response.status(200).json({
        success: true,
        error: null,
        results: results,
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
