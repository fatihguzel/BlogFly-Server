const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "config", ".env"),
});

const app = require("./src/app");
const server = http.createServer(app);

const port = process.env.PORT || 5000;
const version = process.env.NODE_ENV;
const mongo_uri = process.env.MONGO_URI;

mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb+srv://BlogFly:BlogFly@mehmetfatihguzel.7trpf8x.mongodb.net/BlogFly?retryWrites=true&w=majority",
  {},
  (err) => {
    if (err) throw err;
    server.listen(port, () =>
      console.log(`Api start on port: ${port} -- version: ${version}`)
    );
  }
);
