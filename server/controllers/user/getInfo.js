const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
    // const id = req.params.id;
    const token = req.headers.accesstoken;
    if (!token) {
        return res.status(403).json({ message: "fail" });
    } else {
        const userInfo = verify(token, process.env.ACCESS_SECRET);
        if (!userInfo) {
            return res.status(403).json({ message: "invalid token" });
        } else {
            return res.status(200).json({ data: userInfo, message: "ok" });
        }
    }
};
