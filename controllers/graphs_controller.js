const Graph = require("../models/graph");

//Build Graph
module.exports.buildGraph = async function (request, response) {
  Graph.buildGraph()
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
//Get Shortest Distances
module.exports.getShortestDistances = async function (request, response) {
  let username = request.body.username;
  Graph.getShortestDistances({ username })
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

//Load Friends
module.exports.loadFriends = async function (request, response) {
  let username = request.body.username;
  Graph.loadFriends({ username })
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
//Get Friends
module.exports.getFriends = function ({}) {};
//Get Extended Friends
module.exports.getExtendedFriends = function ({}) {};
//Get Recommendations
module.exports.getRecommendations = function ({}) {};
