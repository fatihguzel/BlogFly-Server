var nodemailer = require("nodemailer");
const ejs = require("ejs");
const { dirname } = require("path");
const { websiteLink } = require("../helper/config");

const sendContactMailer = ({ content, userName, userEmail }) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "testdeneme187@gmail.com",
      pass: "pbotcdsgdhoogqkk",
    },
  });

  ejs.renderFile(
    __dirname + "/templates/sendContactEmail.ejs",
    { content },
    (err, data) => {
      if (err) {
      } else {
        var mailOptions = {
          from: '"BlogFly" <testdeneme187@gmail.com>',
          to: userEmail,
          subject: "Feedback From BlogFly",
          html: data,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
        });
      }
    }
  );
};

const sendRegisterMailer = ({ confirmCode, userEmail }) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "testdeneme187@gmail.com",
      pass: "pbotcdsgdhoogqkk",
    },
  });
  const link = websiteLink;

  ejs.renderFile(
    __dirname + "/templates/sendConfirmCode.ejs",
    { confirmCode, link },
    (err, data) => {
      if (err) {
      } else {
        var mailOptions = {
          from: '"BlogFly" <testdeneme187@gmail.com>',
          to: userEmail,
          subject: "Feedback From BlogFly",
          html: data,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
        });
      }
    }
  );
};

module.exports = {
  sendContactMailer,
  sendRegisterMailer,
};
