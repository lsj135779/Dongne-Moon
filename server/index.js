require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = 4000;
const controllers = require("./controllers");
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use("/", controllers);
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

module.exports = app.listen(port, () => {
  console.log(`Server On: http://localhost:${port}/`);
});