//Local Imports
const { pool } = require("../config/db");
const Graph = require("../utils/DataStructures");
const { getAllVertices, getAllEdges } = require("../utils/graph_utils");
const {
  redisSetGraph,
  redisClearGraph,
  redisGetGraph,
} = require("../utils/redis_utils");

//Create the Graph
g = new Graph();
//Build Graph
module.exports.buildGraph = function () {
  return new Promise(async function (resolve, reject) {
    let vertices, edges;
    try {
      vertices = JSON.parse(await getAllVertices());
    } catch (error) {
      return reject(error);
    }
    try {
      edges = JSON.parse(await getAllEdges());
    } catch (error) {
      return reject(error);
    }
    for (let vertex of vertices) {
      g.addVertex(vertex.username);
    }
    for (let edge of edges) {
      g.addEdge(edge.friend_one, edge.friend_two);
    }
    let new_promise;
    try {
      new_promise = await redisSetGraph(g.stringify());
    } catch (error) {
      console.error(error);
      return reject(error);
    }
    return resolve("Loaded Graph in Redis");
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
