//Local Imports
const Graph = require("../utils/DataStructures");
const { getAllVertices, getAllEdges } = require("../utils/graph_utils");
const {
  redisSetGraph,
  redisGetGraph,
  redisSetShortestPaths,
} = require("../utils/redis_utils");

//Build Graph
module.exports.buildGraph = function () {
  return new Promise(async function (resolve, reject) {
    let g = new Graph();
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
    return resolve();
  });
};
//Get Shortest Distances
module.exports.getShortestDistances = function ({ username: username }) {
  return new Promise(async function (resolve, reject) {
    let graph;
    try {
      graph = await redisGetGraph();
    } catch (error) {
      return reject(error);
    }
    if (graph === null || graph === undefined) {
      try {
        graph = await module.exports.buildGraph();
      } catch (error) {
        return reject(error);
      }
    }
    let g = new Graph(graph);
    let results = g.dijkstra(username);
    let new_promise;
    try {
      new_promise = await redisSetShortestPaths(username, results);
    } catch (error) {
      return reject(error);
    }
    return resolve(results);
  });
};
//Get Friends
module.exports.getFriends = function ({}) {};
//Get Extended Friends
module.exports.getExtendedFriends = function ({}) {};
//Get Recommendations
module.exports.getRecommendations = function ({}) {};
