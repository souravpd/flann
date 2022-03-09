//Library Imports
const express = require("express");

//Local Imports
const commentsController = require("../controller/comments_controller");
const { verify_token, verify_access } = require("../utils/verify_token");
const {
  build_graph,
  shortest_paths,
  load_friends,
} = require("../middleware/graph_middlewares");

const router = express.Router();

//Define Routes
router.post(
  "/createComment",
  [verify_token, build_graph, shortest_paths, load_friends, verify_access],
  commentsController.createComment
);

router.post(
  "/deleteComment",
  [verify_token, build_graph, shortest_paths, load_friends, verify_access],
  commentsController.deleteComment
);


