const { post, user } = require("../../models");

module.exports = async (req, res) => {
    const category = req.params.category;
    const pageNum = req.query.page;
    let offset = 0;
    if (pageNum > 1) {
        offset = (10 * (pageNum - 1)) / 2;
    }

    if (category === "all") {
        const allPostCount = await post
            .count({
                include: {
                    model: user,
                    attributes: ["nickname", "address"],
                },
            })
            .catch((err) => res.json(err));
        if (pageNum - 1 > Math.round(allPostCount / 5)) {
            return res.status(405).json({ message: "fail" });
        }

        const postAll = await post.findAll({
            include: {
                model: user,
                attributes: ["nickname", "address"],
            },
            limit: 5,
            offset: offset,
        });
        return res.status(200).json({ data: postAll, message: "ok" });
    } else {
        try {
            const categoryPostCount = await post
                .count({
                    where: {
                        category,
                    },
                    include: {
                        model: user,
                        attributes: ["nickname", "address"],
                    },
                })
                .catch((err) => res.json(err));
            if (pageNum - 1 > Math.round(categoryPostCount / 5)) {
                return res.status(405).json({ message: "fail" });
            }

            const postList = await post.findAll({
                where: {
                    category,
                },
                include: {
                    model: user,
                    attributes: ["nickname", "address"],
                },
                limit: 5,
                offset: offset,
            });
            return res.status(200).json({ data: postList, message: "ok" });
        } catch {
            return res.status(404).json({ message: "fail" });
        }
    }
};
