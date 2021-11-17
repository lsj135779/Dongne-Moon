require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const controllers = require("./controllers");

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
