const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Module-3 server running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});