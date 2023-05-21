const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

dotenv.config({
  path: path.join(__dirname, "config", ".env"),
});

const app = require("./app");
const server = http.createServer(app);

const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "https://blogfly-front.vercel.app"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

// CORS yapılandırması
app.use(cors());

io.on("connection", (socket) => {
  console.log("Yeni bir bağlantı kuruldu.");

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`Kullanıcı ${socket.id}, odaya katıldı: ${room}`);
  });

  socket.on("message", (data) => {
    console.log("Gelen mesaj:", data);
    io.to(data.room).emit("message", {
      sender: data.sender,
      message: data.message,
    });
  });

  socket.on("disconnect", () => {
    console.log("Bağlantı kesildi.");
  });

  // Kullanıcı adını güncelleme
  socket.on("updateUserName", (userName) => {
    socket.userName = userName;
  });
});

const port = process.env.PORT || 5000;
const version = process.env.NODE_ENV;
const mongo_uri = process.env.MONGO_URI;

mongoose.set("strictQuery", true);

mongoose.connect(mongo_uri, {}, (err) => {
  if (err) throw err;
  server.listen(port, () =>
    console.log(`Api start on port: ${port} -- version: ${version}`)
  );
});
