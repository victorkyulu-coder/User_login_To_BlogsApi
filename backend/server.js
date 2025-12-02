const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jsonServer = require("json-server");

const SECRET = "MY_SECRET_KEY";
const app = express();

app.use(cors());
app.use(express.json());

// read database
const getDB = () => JSON.parse(fs.readFileSync("./db.json", "utf8"));

// save database
const saveDB = (db) =>
  fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));

// ------------------- AUTH -------------------

app.post("/register", (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  const db = getDB();

  if (db.users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = {
    id: Date.now(),
    email,
    firstName,
    lastName,
    password: bcrypt.hashSync(password, 10)
  };

  db.users.push(newUser);
  saveDB(db);

  const token = jwt.sign({ id: newUser.id }, SECRET);

  res.json({ token, user: newUser });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = getDB();

  const user = db.users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "User not found" });

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Wrong password" });
  }

  const token = jwt.sign({ id: user.id }, SECRET);

  res.json({ token, user });
});

// ------------------- JSON SERVER ROUTES -------------------

const router = jsonServer.router("./db.json");
app.use("/", router);

// -------------------

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
