//Library Imports
const express = require("express");

//Local Imports
const likesController = require("../controllers/likes_controller");
const { verify_token } = require("../utils/verify_token");

const router = express.Router();

//Define Routes
router.post("/like", verify_token, likesController.like);
router.post("/unlike", verify_token, likesController.unlike);
router.get("/getLikes", verify_token, likesController.getLikes);

module.exports = router;
