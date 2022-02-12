const {
  buildGraph,
  shortestPaths,
  loadFriends,
} = require("./middleware_utils");

async function build_graph(request, response, next) {
  buildGraph()
    .then(function () {
      next();
    })
    .catch(function (error) {
      return response.status(400).json({
        success: false,
        error: error,
        results: null,
      });
    });
}

async function shortest_paths(request, response, next) {
  let username = request.auth.username;
  shortestPaths({ username: username })
    .then(function () {
      next();
    })
    .catch(function (error) {
      return response.status(400).json({
        success: false,
        error: error,
        results: null,
      });
    });
}

async function load_friends(request, response, next) {
  let username = request.auth.username;
  loadFriends({ username: username })
    .then(function () {
      next();
    })
    .catch(function (error) {
      return response.status(400).json({
        success: false,
        error: error,
        results: null,
      });
    });
}

module.exports = { build_graph, shortest_paths, load_friends };
