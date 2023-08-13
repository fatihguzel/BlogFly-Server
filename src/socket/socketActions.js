// burada socket aksşiynları yazılacak
// Path: src\socket\socketActions.js

const { saveMessage } = require("../services/socket.services");

const socketActions = (io) => {
  io.on("connection", (socket) => {
    console.log("Yeni bir bağlantı kuruldu.");

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`Kullanıcı ${socket.id}, odaya katıldı: ${room}`);
    });

    socket.on("message", (data) => {
      console.log("Gelen mesaj:", data);
      io.to(data.room).emit("message", saveMessage(data));
    });

    socket.on("disconnect", () => {
      console.log("Bağlantı kesildi.");
    });
  });
};

module.exports = socketActions;
