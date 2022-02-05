//Library Imports
const express = require("express");

//LocalImports
const graphsController = require("../controllers/friends_controller");
const { verify_token } = require("../utils/verify_token");
//Create Router
const router = express.Router();

//Define Routes
//This function builds the graph and calculates the shortest distances
router.get("/buildGraph", verify_token, graphsController.buildGraph);
//This function returns the list of immediate friends
router.get("/getFriends/:username", verify_token, graphsController.getFriends);
//This function returns the list of friends in range distance (2 <= dist <= 4)
router.get(
  "/getExtendedFreinds/:username",
  verify_token,
  graphsController.getExtendedFriends
);
//This function calculates the Jaccard Coefficient of Similarity for Recommending New Friends
router.get(
  "/getRecommendations/:username",
  verify_token,
  graphsController.getRecommendations
);
