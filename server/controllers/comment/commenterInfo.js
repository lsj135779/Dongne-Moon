const { user, comment } = require("../../models");

module.exports = async (req, res) => {
  const id = req.params.id;

  const commenterInfo = await comment.findOne({
    where: {
      id,
    },
    include: {
      model: user,
      attributes: ["img", "nickname", "intro"],
    },
  });
  if (!commenterInfo) {
    return res.status(404).json({ message: "fail" });
  }
  return res.status(200).json({ data: commenterInfo, message: "ok" });
};
