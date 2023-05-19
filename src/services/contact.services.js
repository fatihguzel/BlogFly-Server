const CustomError = require("../error/CustomError");
const { User } = require("../model/UserModel");
var nodemailer = require('nodemailer');

const sendContactMailService = async (userName, userEmail, content) => {
  const user = await User.findOne({ userEmail });
  if (content === "" || userName === "" || userEmail === "")
    throw new CustomError(400, "Please check your input");
  if (!user) throw new CustomError(400, "User not found");

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testdeneme187@gmail.com',
      pass: 'pbotcdsgdhoogqkk'
    }
  });
  console.log(userEmail)
  var mailOptions = {
    from: '"BlogFly" <testdeneme187@gmail.com>',
    to: userEmail,
    subject: 'Feedback From BlogFly',
    html: '<h1>'+content +'</h1>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return { success: true, data: content };
};

module.exports = {sendContactMailService };
