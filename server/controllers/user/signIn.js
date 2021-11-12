require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
const { user } = require("../../models");

module.exports = async (req, res) => {
    const userInfo = await user.findOne({
        where: {
            email: req.body.email,
            password: req.body.password,
        }
    })
    console.log('asdfadfsdaf', userInfo)
    if (!userInfo) {
        res.status(404).json({ message: "invalid user" });
    }
    const { id, email, img, address, intro, nickname, createdAt } = userInfo;
    const payload = {
        id,
        email,
        img,
        address,
        intro,
        nickname,
        createdAt
    }
    const token = sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1d" })

    res.status(200).json({ message: "ok", accesstoken: token })

}