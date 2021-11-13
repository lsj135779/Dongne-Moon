const { user } = require("../../models");

module.exports = async (req, res) => {
    const id = req.params;
    const token = req.headers
    console.log(token)
    res.send('ok');
};