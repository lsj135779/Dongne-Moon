const { user } = require("../../models");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  console.log(req.file);
  const filePath = req.file.location;
  const id = req.params.id;
  const token = req.headers.accesstoken;

  if (!token) {
    return res.status(403).json({ message: "fail" });
  } else {
    const verified = verify(token, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid token" });
    } else {
      await user.update({ img: filePath }, {
        where: { id }
      })
      const userImg = await user.findOne({
        where: {
          id: verified.id,
        },
        attributes: ["img"],
      });
      return res.status(200).json({ data: userImg, message: "ok" });
    }
  }
};
