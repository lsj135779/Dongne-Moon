const { post, user } = require("../../models");
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = async (req, res) => {
    let keyword = req.body.keyword;
    keyword = keyword.trim();
    keyword = keyword.replace(/\s\s+/gi, ' ');

    const search = await post.findAll({
        include: {
            model: user,
            where: {
                address: { [Op.like]: `%${keyword}%` },
            },
            attributes: ["nickname", "address"],
        },
    });
    return res.status(200).json({ data: search, message: "ok" });
};
