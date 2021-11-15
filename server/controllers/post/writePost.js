const { verify } = require("jsonwebtoken");
const { post } = require("../../models");

module.exports = async (req, res) => {
    const token = req.headers.accesstoken;
    const { userId, category, contents, img, location } = req.body;
    if (!userId || !category || !contents) {
        return res.status(422).json({ message: "check parameters" });
    } else {
        if (!token) {
            return res.status(403).json({ message: "invalid token" });
        } else {
            const verified = verify(token, process.env.ACCESS_SECRET);
            if (!verified) {
                return res.status(403).json({ message: "invalid token" });
            } else {
                if (userId !== verified.id) {
                    return res.status(404).json({ message: "fail" })
                } else {
                    //img, location 작업 부분
                    await post.create({
                        userId,
                        category,
                        contents,
                        img,
                        location
                    })
                    return res.status(201).json({ message: "ok" });
                }
            }

        }
    }
}