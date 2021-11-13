const { user } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { nickname } = req.body;
  const token = req.headers.accesstoken;
  if (!token) {
    return res.status(403).json({ message: "fail" });
  } else {
    const userInfo = verify(token, process.env.ACCESS_SECRET);
    if (!userInfo) {
      return res.status(403).json({ message: "invalid token" });
    } else {
      await user.update(
        { nickname: nickname },
        {
          where: {
            id: userInfo.id,
          },
        }
      );
      const userNickname = await user.findOne({
        where: {
          id: userInfo.id,
        },
        attributes: ["nickname"],
      });
      return res.status(200).json({ data: userNickname, message: "ok" });
    }
  }
};
