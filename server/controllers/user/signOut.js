module.exports = (req, res) => {
  console.log(req.cookies);
  try {
    res
      .status(205)
      .clearCookie("accesstoken")
      .json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};
