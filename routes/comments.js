//Library Imports
const express = require("express");

//Local Imports
const commentsController = require("../controller/comments_controller");
const { verify_token } = require("../utils/verify_token");

const router = express.Router();

//Define Routes
router.post("/createComment", verify_token);
