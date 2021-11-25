const { user } = require("../../models");

module.exports = async (req, res) => {
  const userInfo = await user.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (userInfo) {
    return res.status(409).json({ message: "email exists" });
  } else {
    return res.status(200).json({ message: "ok" });
  }
};
