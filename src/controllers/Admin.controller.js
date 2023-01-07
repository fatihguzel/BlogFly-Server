const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../error/CustomError");
const {
  getUserProfileService,
  userBlockedService,
  userUnBlockedService,
  userDeleteService,
  getAllUsersService,
} = require("../services/admin.services");

class AdminController {
  static getAllUsers = expressAsyncHandler(async (req, res) => {
    const response = await getAllUsersService();

    res.json(response);
  });

  static getUserProfile = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const response = await getUserProfileService(id);
    res.json(response);
  });

  static userBlocked = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const response = await userBlockedService(id);

    res.json(response);
  });

  static userUnBlocked = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const response = await userUnBlockedService(id);

    res.json(response);
  });

  static userDelete = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const response = await userDeleteService(id);

    res.json(response);
  });
}

module.exports = AdminController;
