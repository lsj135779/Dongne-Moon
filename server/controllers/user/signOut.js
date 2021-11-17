const { verify } = require("jsonwebtoken");

module.exports = (req, res) => {
  const token = req.headers.accesstoken;
  if (!token) {
    return res.status(403).json({ message: "invalid token" });
  } else {
    const verified = verify(token, process.env.ACCESS_SECRET);
    if (!verified) {
      return res.status(403).json({ message: "invalid token" });
    } else {
      try {
        res
          .status(205)
          .json({ message: "Logged out successfully" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server error" });
      }
    }
  }
}
