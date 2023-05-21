const { io } = require("../server");

const joinRoomService = async () => {
  // Socket.io bağlantı olayı
  io.on("connection", (socket) => {
    console.log("Yeni bir bağlantı kuruldu.");

    // Kullanıcının odaya katılması
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`Kullanıcı ${socket.id}, odaya katıldı: ${room}`);
    });

    // Mesaj alma olayı
    socket.on("message", (data) => {
      console.log("Gelen mesaj:", data);

      // Mesajı sadece aynı odadaki bağlı istemcilere iletimi
      socket.to(data.room).emit("message", data.message);
    });

    // Bağlantı kesildiğinde
    socket.on("disconnect", () => {
      console.log("Bağlantı kesildi.");
    });
  });
};

module.exports = {
  joinRoomService,
};
