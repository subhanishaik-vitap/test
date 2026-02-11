require("dotenv").config();

const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const { Mangoclient } = require("mangodb");

const PORT = process.env.PORT;
const client = new Mangoclient(process.env.DB_URL);

async function ConnectDB() {
  try {
    await client.connect();
    const db = client.db("data");
    console.log("DB connected..");
  } catch (err) {
    console.log("error:", err);
  }
}

ConnectDB();

app.use(cors());
app.use(express.json());

server.listen(PORT, "0.0.0.0", () => {
  console.log("server is running...");
});

app.post("/submit", async (req, res) => {
  try {
    console.log(req.body);

    const { username, password } = req.body;
    const datasend = await db.collection("users").insertOne({
      username,
      password,
    });
    res.send("OK!!");
  } catch (err) {
    console.log("error in saving data:", err);
    res.status(500).json({ message: "Error saving user" });
  }
});

app.get("/", (req, res) => {
  res.send("home");
});
