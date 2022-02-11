//Local Imports
const Graph = require("../utils/DataStructures");
const { getAllVertices, getAllEdges } = require("../utils/graph_utils");
const {
  redisSetGraph,
  redisGetGraph,
  redisSetShortestPaths,
  redisGetShortestPaths,
  redisSetFriends,
  redisSetExtendedFriends,
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
//Load Friends
module.exports.loadFriends = function ({ username: username }) {
  return new Promise(async function (resolve, reject) {
    let shortest_paths;
    try {
      shortest_paths = await redisGetShortestPaths(username);
    } catch (error) {
      return reject(error);
    }
    if (shortest_paths === null || shortest_paths == undefined) {
      try {
        shortest_paths = await module.exports.getShortestDistances({
          username: username,
        });
      } catch (error) {
        return reject(error);
      }
    }
    let distances = new Map(Object.entries(shortest_paths));
    let friends = [];
    let extended_friends = [];
    for (let [user, distance] of distances.entries()) {
      if (distance === 1) {
        friends.push(user);
      } else if (distance >= 2 && distance < 5) {
        extended_friends.push(user);
      }
    }
    let new_promise;
    try {
      new_promise = await redisSetFriends(username, friends);
    } catch (error) {
      return reject(error);
    }
    let new_promise_2;
    try {
      new_promise_2 = await redisSetExtendedFriends(username, extended_friends);
    } catch (error) {
      return reject(error);
    }
    return resolve({ friends, extended_friends });
  });
};

//Get Friends
module.exports.getFriends = function ({}) {};
//Get Extended Friends
module.exports.getExtendedFriends = function ({}) {};
//Get Recommendations
module.exports.getRecommendations = function ({}) {};
