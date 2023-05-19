const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../error/CustomError");
const {sendContactMailService} = require("../services/contact.services")

class ContactController {
  static sendContactMail = expressAsyncHandler(async (req, res) => {
    const { userName, userEmail, content } = req.body;
    const response = await sendContactMailService(userName, userEmail, content);
    res.json(response);
  });

}

module.exports = ContactController;
