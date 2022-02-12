//Library Imports
const express = require("express");

//LocalImports
const graphsController = require("../controllers/graphs_controller");
const { verify_token } = require("../utils/verify_token");
const {
  build_graph,
  shortest_paths,
  load_friends,
} = require("../middleware/graph_middlewares");

//Create Router
const router = express.Router();

//Define Routes
//This function returns the list of immediate friends
//Called when a user log in or accepts a request
router.get(
  "/getFriends",
  [verify_token, build_graph, shortest_paths, load_friends],
  graphsController.getFriends
);

//This function returns the list of friends in range distance (2 <= dist <= 4)
//Called when a user log in or accepts a request
router.get(
  "/getExtendedFriends",
  [verify_token, build_graph, shortest_paths, load_friends],
  graphsController.getExtendedFriends
);

//This function calculates the Jaccard Coefficient of Similarity for Recommending New Friends
//Called when a user log in or accepts a request
router.get(
  "/getRecommendations",
  verify_token,
  graphsController.getRecommendations
);

module.exports = router;
