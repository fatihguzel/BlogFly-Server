const express = require("express");
const RelationShipsController = require("../controllers/Relationships.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const relationShipsRouter = express.Router();

relationShipsRouter
  .route("/")
  .all(authMiddleware)
  .get(RelationShipsController.getFriends);

module.exports.relationShipsRouter = relationShipsRouter;
