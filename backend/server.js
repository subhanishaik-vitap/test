const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");

app.use(cors());
app.use(express.json());

server.listen(3000, "0.0.0.0", () => {
  console.log("server is running...");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send("OK!!");
});

app.get("/", (req, res) => {
  res.send("home");
});
