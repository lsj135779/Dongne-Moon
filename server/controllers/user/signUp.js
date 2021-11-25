const { user } = require("../../models");
const CryptoJS = require("crypto-js");

module.exports = async (req, res) => {
  const userInfo = await user.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (userInfo) {
    return res.status(409).json({ message: "email exists" });
  }
  const { email, address, password } = req.body;
  const saltIssue = CryptoJS.lib.WordArray.random(128 / 8);
  const salt = saltIssue.toString(CryptoJS.enc.Base64);
  const encrypted = CryptoJS.PBKDF2(password, salt, {
    keySize: 512 / 32,
    iterations: 1000,
  });
  const encryptedPW = encrypted.toString(CryptoJS.enc.Base64);

  user.create({
    email,
    address,
    password: encryptedPW,
    salt,
  });
  return res.status(200).json({ message: "ok" });
};
