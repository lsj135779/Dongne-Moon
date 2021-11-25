const { post, comment } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const id = req.params.id;
  const token = req.headers.accesstoken;
  if (!token) {
    return res.status(403).json({ message: "invalid token" });
  } else {
    const verified = verify(token, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid token" });
    } else {
      const postUserId = await post.findOne({
        where: {
          id
        },
        attributes: ["userId"]
      })
      if (verified.id !== postUserId.userId) {
        return res.status(404).json({ message: "fail to delete" });
      } else {
        await comment.destroy({
          where: {
            postId: id
          }
        })
        await post.destroy({
          where: {
            id
          }
        })
        return res.status(200).json({ message: "ok" });
      }
    }
  }
}