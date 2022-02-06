//Library Imports
const express = require("express");

//LocalImports
const graphsController = require("../controllers/graphs_controller");
const { verify_token } = require("../utils/verify_token");

//Create Router
const router = express.Router();

//Define Routes

//This function builds the graph
//Called once at the start of the server and periodically as a cron job
router.get("/buildGraph", graphsController.buildGraph);

//This function calculates the shortest distances from a username
//Called when a User log in
router.get(
  "/getShortestDistances",
  verify_token,
  graphsController.getShortestDistances
);

//This function returns the list of immediate friends
//Called when a user log in or accepts a request
router.get("/getFriends/:username", verify_token, graphsController.getFriends);

//This function returns the list of friends in range distance (2 <= dist <= 4)
//Called when a user log in or accepts a request
router.get(
  "/getExtendedFriends/:username",
  verify_token,
  graphsController.getExtendedFriends
);

//This function calculates the Jaccard Coefficient of Similarity for Recommending New Friends
//Called when a user log in or accepts a request
router.get(
  "/getRecommendations/:username",
  verify_token,
  graphsController.getRecommendations
);

module.exports = router;
