const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
const port = 80;

app.use(
    cors({
        origin: true,
        credentials: true
    })
);
app.get("/", (req, res) => {
    res.status(201).send("Hello World!!!rrr")
})

module.exports = app.listen(port, () => {
    console.log(`Server On: http//localhost:${port}/`);
});