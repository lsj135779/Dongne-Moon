const cors = require("cors");
const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.json({
    limit: "50mb"
}));
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
        methods: ["GET", "POST", "OPTIONS", "DELETE"],
    })
);
app.get("/", (req, res) => {
    res.send("Hello World!!!")
})

module.exports = app.listen(PORT, () => {
    console.log(`Server On: http//localhost:${PORT}/`);
});