const { comment } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const id = req.params.id;
  const token = req.cookies.accesstoken;

  if (!token) {
    return res.status(403).json({ message: "invalid token" });
  } else {
    const verified = verify(token, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid token" });
    } else {
      try {
        await comment.destroy({
          where: {
            id,
          },
        });
        return res.status(201).json({ message: "success to delete" });
      } catch {
        return res.status(404).json({ message: "fail to delete" });
      }
    }
  }
};