const { user } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const token = req.cookies.accesstoken;
  if (!token) {
    return res.status(403).json({ message: "fail" });
  } else {
    const verified = verify(token, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid token" });
    } else {
      await user.destroy({
        where: {
          id: verified.id,
        },
      });

      return res.clearCookie("accesstoken").status(200).json({ message: "ok" });
    }
  }
};
