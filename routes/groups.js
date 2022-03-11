//Library Imports
const express = require("express");
//Local Imports
const groupsController = require("../controllers/groups_controller");
const { verify_token, verify_group_access } = require("../utils/verify_token");

//Create Router
const router = express.Router();
//Define Routes
router.post("/createGroup", verify_token, groupsController.createController);
router.post(
  "/createGroupPost",
  [verify_token, verify_group_access],
  groupsController.createGroupPost
);
module.exports = router;
