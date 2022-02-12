//Library Imports
const express = require("express");
//Local Imports
const postsController = require("../controllers/posts_controller");
const { verify_token } = require("../utils/verify_token");

const router = express.Router();
//Define Routes
router.post("/createPost", verify_token, postsController.createPost);
router.get(
  "/getAllPublicPosts",
  verify_token,
  postsController.getAllPublicPosts
);
router.get(
  "/getAllFriendsPosts",
  verify_token,
  postsController.getAllFriendsPosts
);
router.get(
  "/getAllExtendedFriendsPosts",
  verify_token,
  postsController.getAllExtendedFriendsPosts
);

module.exports = router;
