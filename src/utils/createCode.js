const crypto = require("crypto");

const createCode = () => {
  const timestamp = Date.now().toString(); // Geçerli zaman bilgisini al
  const randomBytes = crypto.randomBytes(4).toString("hex"); // Rastgele baytlar oluştur
  const hash = crypto
    .createHash("sha256")
    .update(timestamp + randomBytes)
    .digest("hex"); // Hash oluştur

  const uniqueCode = hash.slice(0, 8); // İstenilen karakter sayısıyla benzersiz kodu belirle

  return uniqueCode;
};

module.exports = {
  createCode,
};
