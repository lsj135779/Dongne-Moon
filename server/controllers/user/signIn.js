require("dotenv").config();
const { sign } = require("jsonwebtoken");
const { user } = require("../../models");
const CryptoJS = require("crypto-js");

module.exports = async (req, res) => {
  const userInfo = await user.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!userInfo) {
    return res.status(404).json({ message: "invalid user" });
  }
  const {
    id,
    email,
    salt,
    img,
    password,
    address,
    intro,
    nickname,
    createdAt,
  } = userInfo;
  const encrypted = CryptoJS.PBKDF2(req.body.password, salt, {
    keySize: 512 / 32,
    iterations: 1000,
  });
  const encryptedPW = encrypted.toString(CryptoJS.enc.Base64);

  if (password === encryptedPW) {
    const payload = {
      id,
      email,
      img,
      address,
      intro,
      nickname,
      createdAt,
    };
    const token = sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1d" });
    return res.status(200).json({ accesstoken: token, message: "ok" });
  } else {
    return res.status(404).json({ message: "invalid user" });
  }
};
