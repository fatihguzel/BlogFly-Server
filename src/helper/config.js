const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
  path: path.join(__dirname, "config", ".env"),
});

console.log("proccesEnv", process.env.NODE_ENV);
let websiteLink;

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === "production") {
  websiteLink = "https://blogfly-front.vercel.app";
  console.log("production");
} else if (NODE_ENV === "development") {
  websiteLink = "http://localhost:3000/auth/confirmCode";
  console.log("development");
} else {
  websiteLink = "https://default-link.com";
}

module.exports = {
  websiteLink,
};
