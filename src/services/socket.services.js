// socketten gelen mesajları veritabanına kaydeden servis
const { Room } = require("../model/RoomModel");

const saveMessage = (data) => {
  const saveFunc = async () => {
    const room = await Room.findOne({ roomName: data.room });
    room.messages.push({
      user: data.sender,
      message: data.message,
    });
    await room.save();
  };
  saveFunc();

  return {
    sender: data.sender,
    message: data.message,
  };
};

module.exports = {
  saveMessage,
};
