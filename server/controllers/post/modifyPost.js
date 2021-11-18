const { post, user } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  const id = req.params.id;
  const { contents } = req.body;
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
        return res.status(404).json({ message: "fail to update" });
      } else {
        await post.update({
          contents,
        },
          {
            where: {
              id,
            },
          }
        );
        const postUser = await post.findOne({
          where: {
            id,
          },
          include: {
            model: user,
            attributes: ["nickname", "address", "img"],
          },
        });
        return res.status(200).json({ data: postUser, message: "ok" });
      }
    }
  }
}