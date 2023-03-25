const expressAsyncHandler = require("express-async-handler");
const { getFriendsService } = require("../services/relationships.services");

class RelationShipsController {
  static getFriends = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const response = await getFriendsService({ user });
    res.json(response);
  });
}

module.exports = RelationShipsController;
