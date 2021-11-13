const { user } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const token = req.headers.accesstoken;
  if (!token) {
    return res.status(403).json({ message: "fail" });
  } else {
    const userInfo = verify(token, process.env.ACCESS_SECRET);
    if (!userInfo) {
      return res.status(403).json({ message: "invalid token" });
    } else {
      await user.destroy({
        where: {
          id: userInfo.id,
        },
      });
      return res.status(200).json({ message: "ok" });
    }
  }
};
