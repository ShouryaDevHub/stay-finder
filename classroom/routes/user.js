const express = require("express");
const router = express.Router();

// Users
// Indea Route
router.get("/", (req, res) => {
  res.send("GET for users");
});

// Show Route
router.get("/:id", (req, res) => {
  res.send("GET for users id");
});

// POST Route
router.post("/", (req, res) => {
  res.send("POST for show users");
});

// Delete Route
router.delete("/:id", (req, res) => {
  res.send("DELETE for users id");
});

module.exports = router;
