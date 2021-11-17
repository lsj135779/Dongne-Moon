const { post, user } = require("../../models");

module.exports = async (req, res) => {
    const category = req.params.category;
    console.log(category)
    if (category === 'all') {
        const postAll = await post.findAll({
            include: {
                model: user,
                attributes: ["nickname", "address"]
            }
        });
        return res.status(200).json({ data: postAll, message: "ok" });
    } else {
        try {
            const postList = await post.findAll({
                where: {
                    category,
                },
                include: {
                    model: user,
                    attributes: ["nickname", "address"]
                }
            })
            return res.status(200).json({ data: postList, message: "ok" });
        } catch {
            return res.status(404).json({ message: "fail" });
        }
    }
  } else {
    const postAll = await post.findAll({
      include: {
        model: user,
        attributes: ["nickname", "address"],
      },
    });
    return res.status(200).json({ data: postAll, message: "ok" });
  }
};
