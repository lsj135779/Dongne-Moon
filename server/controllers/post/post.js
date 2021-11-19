const { verify } = require("jsonwebtoken");
const { post, comment, user } = require("../../models");

module.exports = async (req, res) => {
  const id = req.params.id;
  const token = req.headers.accesstoken;
  const postCommentUser = await post.findOne({
    where: {
      id,
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
  const postUser = await post.findOne({
    where: {
      id,
    },
    include: {
      model: user,
      attributes: ["nickname", "address", "img"],
    },
  });
  if (!postCommentUser) {
    return res.status(404).json({ message: "fail" });
  } else {
    if (token) {
      const verified = verify(token, process.env.ACCESS_SECRET);
      if (verified.id === postCommentUser.userId) {
        return res
          .status(200)
          .json({ data: { postCommentUser, postUser }, message: "ok" });
      } else {
        await post.update(
          { views: postCommentUser.views + 1 },
          {
            where: { id },
          }
        );
        const modifiedPostView = await post.findOne({
          where: {
            id,
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
        const postUser = await post.findOne({
          where: {
            id,
          },
          include: {
            model: user,
            attributes: ["nickname", "address", "img"],
          },
        });
        return res
          .status(200)
          .json({ data: { modifiedPostView, postUser }, message: "ok" });
      }
    } else {
      await post.update(
        { views: postCommentUser.views + 1 },
        {
          where: { id },
        }
      );
      const modifiedPostView = await post.findOne({
        where: {
          id,
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
      const postUser = await post.findOne({
        where: {
          id,
        },
        include: {
          model: user,
          attributes: ["nickname", "address", "img"],
        },
      });
      return res
        .status(200)
        .json({ data: { modifiedPostView, postUser }, message: "ok" });
    }
  }
};
