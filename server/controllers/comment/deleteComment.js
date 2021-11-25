const { comment, post, user } = require("../../models");
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
      const commentUserId = await comment.findOne({
        where: {
          id,
        },
      });
      const postId = commentUserId.postId;
      if (verified.id !== commentUserId.userId) {
        return res.status(404).json({ message: "fail to delete" });
      } else {
        await comment.destroy({
          where: {
            id,
          },
        });
        const postCommentUser = await post.findOne({
          where: {
            id: postId,
          },
          include: {
            model: comment,
            attributes: ["id", "contents", "createdAt"],
            include: {
              model: user,
              attributes: ["img", "nickname", "address", "id"],
            },
          },
        });
        return res.status(201).json({ data: postCommentUser, message: "success to delete" });
      }
    }
  }
};
