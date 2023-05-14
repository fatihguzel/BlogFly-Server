const express = require("express");
const RelationShipsController = require("../controllers/Relationships.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const relationShipsRouter = express.Router();

relationShipsRouter
  .route("/getFriends")
  .all(authMiddleware)
  .get(RelationShipsController.getFriends);

relationShipsRouter
  .route("/getFriendRequests")
  .all(authMiddleware)
  .get(RelationShipsController.getFriendRequests);

relationShipsRouter
  .route("/getPendingRequests")
  .all(authMiddleware)
  .get(RelationShipsController.getPendingRequests);

relationShipsRouter
  .route("/sendFriendRequest")
  .all(authMiddleware)
  .post(RelationShipsController.sendFriendRequest);

relationShipsRouter
  .route("/acceptFriendRequest")
  .all(authMiddleware)
  .post(RelationShipsController.acceptFriendRequest);

module.exports.relationShipsRouter = relationShipsRouter;
