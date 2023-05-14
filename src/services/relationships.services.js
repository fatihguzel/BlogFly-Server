const CustomError = require("../error/CustomError");
const { RelationShips } = require("../model/Relationships");
const { User } = require("../model/UserModel");

const getFriendsService = async ({ user }) => {
  const relationships = await RelationShips.findOne({ user });
  console.log("relation", relationships);
  return { success: true, data: relationships.friends };
};

const sendFriendRequestService = async ({ user, requestedUsername }) => {
  if (requestedUsername === "")
    throw new CustomError(400, "Please check your friend username");

  if (user.username === requestedUsername)
    throw new CustomError(400, "You can't send yourself a friend request");

  const friend = await User.findOne({ username: requestedUsername });
  console.log(friend);
  if (friend === null) throw new CustomError(400, "Friend Not Found");

  // İsteği Alan Kullanıcı
  const receiver = await RelationShips.findOne({ user: friend });

  // İstek Atan Kullanıcı
  const sender = await RelationShips.findOne({ user });

  // Request İşlemi
  const x = sender?.pendingRequest.filter(
    (request) => request?.username === friend.username
  );
  if (x.length !== 0) throw new CustomError(400, "Friend Request Already Sent");

  sender?.pendingRequest.push({
    username: friend.username,
    email: friend.email,
  });
  receiver?.friendrequests.push({ username: user.username, email: user.email });

  await sender.save();
  await receiver.save();

  return {
    success: true,
    data: [sender, receiver],
  };
};

const getFriendRequestsService = async ({ user }) => {
  const relationships = await RelationShips.findOne({ user: user });
  const friendrequests = relationships.friendrequests;

  return { success: true, data: friendrequests };
};

const getPendingRequestsService = async ({ user }) => {
  const relationships = await RelationShips.findOne({ user: user });

  return { success: true, data: relationships.pendingRequest };
};

const acceptFriendRequestService = async ({ user, requestedUsername }) => {
  // İsteği kabul edecek kullanıcı
  const receiver = await RelationShips.findOne({ user: user });

  // İsteği atan kullanıcı
  const requestedUser = await User.findOne({ username: requestedUsername });
  if (requestedUser === null)
    throw new CustomError(400, "Requested User Not Found");

  const requestedUserId = requestedUser?.id;
  const sender = await RelationShips.findOne({ user: requestedUserId });

  // İsteği kabul edecek kişinin işlemleri
  const receiverFriendList = receiver?.friends;
  const checkFriendList = receiverFriendList.filter(
    (friend) => friend?.username !== requestedUsername
  );

  if (JSON.stringify(checkFriendList) !== JSON.stringify(receiverFriendList))
    throw new CustomError(400, "User is already your friend");

  const receiverFriendRequests = receiver?.friendrequests;
  const newFriendRequestsList = receiverFriendRequests.filter(
    (friend) => friend?.username !== requestedUsername
  );
  console.log(receiverFriendRequests, newFriendRequestsList);
  if (
    JSON.stringify(receiverFriendRequests) ===
    JSON.stringify(newFriendRequestsList)
  )
    throw new CustomError(400, "The user did not send you a request");

  receiver?.friends.push({
    username: requestedUser?.username,
    email: requestedUser?.email,
  });

  receiver.friendrequests = newFriendRequestsList;
  await receiver.save();

  // İsteği atan kişinin işlemleri
  const senderPendingFriendRequests = sender?.pendingRequest;
  const newPendingList = senderPendingFriendRequests.filter(
    (friend) => friend?.username !== user?.username
  );

  sender.friends.push({
    username: user?.username,
    email: user?.email,
  });

  sender.pendingRequest = newPendingList;
  await sender.save();

  return { success: true, message: "Friend Request Accepted" };
};

module.exports = {
  getFriendsService,
  getFriendRequestsService,
  sendFriendRequestService,
  getPendingRequestsService,
  acceptFriendRequestService,
};
