const { RelationShips } = require("../model/Relationships");

const getFriendsService = async ({ user }) => {
  const id = user.id;
  const relationships = await RelationShips.findOne({ user });

  return { success: true, data: relationships.friends };
};

module.exports = {
  getFriendsService,
};
