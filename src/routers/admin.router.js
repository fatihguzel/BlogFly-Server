const express = require("express");
const AdminController = require("../controllers/Admin.controller");
const adminMiddleware = require("../middlewares/adminMiddlewares");

const adminRouter = express.Router();

adminRouter
  .route("/getAllUsers")
  .all(adminMiddleware)
  .get(AdminController.getAllUsers);

adminRouter
  .route("/getUserProfile/:id")
  .all(adminMiddleware)
  .get(AdminController.getUserProfile);

adminRouter
  .route("/userBlocked/:id")
  .all(adminMiddleware)
  .put(AdminController.userBlocked);

adminRouter
  .route("/userUnBlocked/:id")
  .all(adminMiddleware)
  .put(AdminController.userUnBlocked);

adminRouter
  .route("/userDelete/:id")
  .all(adminMiddleware)
  .delete(AdminController.userDelete);

module.exports.adminRouter = adminRouter;
