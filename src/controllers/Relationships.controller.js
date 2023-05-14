const expressAsyncHandler = require("express-async-handler");
const {
  getFriendsService,
  sendFriendRequestService,
  getFriendRequestsService,
  getPendingRequestsService,
  acceptFriendRequestService,
} = require("../services/relationships.services");

class RelationShipsController {
  static getFriends = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const response = await getFriendsService({ user });

    res.json(response);
  });

  static sendFriendRequest = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const requestedUsername = req.body.requestedUsername;
    const response = await sendFriendRequestService({
      user,
      requestedUsername,
    });

    res.json(response);
  });

  static getFriendRequests = expressAsyncHandler(async (req, res) => {
    const user = req.user;

    const response = await getFriendRequestsService({ user });

    res.json(response);
  });

  static getPendingRequests = expressAsyncHandler(async (req, res) => {
    const user = req.user;

    const response = await getPendingRequestsService({ user });

    res.json(response);
  });

  static acceptFriendRequest = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const requestedUsername = req.body.requestedUsername;

    const response = await acceptFriendRequestService({
      user,
      requestedUsername,
    });

    res.json(response);
  });
}

module.exports = RelationShipsController;
