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
//Add Vertex
module.exports.addVertex = function ({}) {};
//Add Edge
module.exports.addEdge = function ({}) {};
//Get Shortest Distances
module.exports.getShortestDistances = function ({}) {};
//Get Friends
module.exports.getFriends = function ({}) {};
//Get Extended Friends
module.exports.getExtendedFriends = function ({}) {};
//Get Recommendations
module.exports.getRecommendations = function ({}) {};
