const { user } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { intro } = req.body;
  const token = req.cookies.accesstoken;
  if (!token) {
    return res.status(403).json({ message: "fail" });
  } else {
    const verified = verify(token, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid token" });
    } else {
      await user.update(
        { intro: intro },
        {
          where: {
            id: verified.id,
          },
        }
      );
      const userIntro = await user.findOne({
        where: {
          id: verified.id,
        },
        attributes: ["intro"],
      });
      return res.status(200).json({ data: userIntro, message: "ok" });
    }
  }
};
