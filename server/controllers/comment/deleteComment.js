const { comment } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const token = req.headers.accesstoken;

  if (!token) {
    return res.status(403).json({ message: "invalid token" });
  } else {
    const verified = verify(token, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid token" });
    } else {
      const commentUserId = await comment.findOne({
        where: {
          id,
        },
      });
      if (verified.id !== commentUserId.userId) {
        return res.status(404).json({ message: "fail to delete" });
      } else {
        await comment.destroy({
          where: {
            id,
          },
        });
        return res.status(201).json({ message: "success to delete" });
      }
    }
  }
};
