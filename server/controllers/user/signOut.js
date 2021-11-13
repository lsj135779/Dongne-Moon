module.exports = (req, res) => {
  try {
    res.clearCookie("accesstoken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/user",
      domain: "localhost.com",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};
