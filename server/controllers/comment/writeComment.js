const { post, comment } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { userId, contents, postId } = req.body;
  const token = req.headers.accesstoken;

  if (!userId || !contents || !postId) {
    return res.status(422).json({ message: "check parameters" });
  } else {
    if (!token) {
      return res.status(403).json({ message: "invalid token" });
    } else {
      const verified = verify(token, process.env.ACCESS_SECRET);

      if (!verified) {
        return res.status(403).json({ message: "invalid token" });
      } else {
        console.log(`#######`, userId);
        console.log(`$$$$$$$`, verified.id);
        if (userId !== verified.id) {
          return res.status(404).json({ message: "fail" });
        } else {
          await comment.create({
            userId,
            contents,
            postId,
          });
          const postInfo = await post.findOne({
            where: { id: postId }
          })
          await post.update({
            comment_cnt: postInfo.comment_cnt + 1
          }, {
            where: { id: postInfo.id }
          })
          return res.status(201).json({ message: "ok" });
        }
      }
    }
  }
};
