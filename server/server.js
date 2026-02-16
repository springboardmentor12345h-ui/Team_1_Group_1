const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "campuseventhub"
});

db.connect((err)=>{
  if(err) throw err;
  console.log("MySQL Connected");
});

// Test route
app.get("/",(req,res)=>{
  res.send("CampusEventHub Backend Running");
});

app.listen(5000,()=>{
  console.log("Server started on port 5000");
});
const bcrypt = require("bcryptjs");

app.post("/register", async (req, res) => {
  const { name, email, password, college, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (name,email,password,college,role) VALUES (?,?,?,?,?)";

  db.query(sql, [name, email, hashedPassword, college, role], (err, result) => {
    if (err) {
      res.send("Email already exists");
    } else {
      res.send("Registration successful");
    }
  });
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (result.length === 0) {
      res.send({ status: "fail", message: "User not found" });
    } else {
      const user = result[0];
      const bcrypt = require("bcryptjs");

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        res.send({
          status: "success",
          name: user.name,
          role: user.role
        });
      } else {
        res.send({ status: "fail", message: "Wrong password" });
      }
    }
  });
});
