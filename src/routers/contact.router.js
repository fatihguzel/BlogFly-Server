const express = require("express");
const ContactController = require("../controllers/Contact.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const contactRouter = express.Router();

contactRouter
  .route("/sendContactMail")
  .post(ContactController.sendContactMail);

module.exports.contactRouter = contactRouter;
