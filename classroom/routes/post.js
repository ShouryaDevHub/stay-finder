const express = require("express");
const router = express.Router();

// Posts
// Indea Route
router.get("/", (req, res) => {
  res.send("GET for posts");
});

// Show Route
router.get("/:id", (req, res) => {
  res.send("GET for posts id");
});

// POST Route
router.post("/", (req, res) => {
  res.send("POST for show posts");
});

// Delete Route
router.delete("/:id", (req, res) => {
  res.send("DELETE for posts id");
});

module.exports = router;
