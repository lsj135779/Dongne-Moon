const { user } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { nickname } = req.body;
  const token = req.cookies.accesstoken;
  if (!token) {
    return res.status(403).json({ message: "fail" });
  } else {
    const verified = verify(token, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid token" });
    } else {
      await user.update(
        { nickname: nickname },
        {
          where: {
            id: verified.id,
          },
        }
      );
      const userNickname = await user.findOne({
        where: {
          id: verified.id,
        },
        attributes: ["nickname"],
      });
      return res.status(200).json({ data: userNickname, message: "ok" });
    }
  }
};
