const express = require("express");
const router = express.Router();

// Getting all
router.get("/", (req, res) => {
  req.send("Hello World");
});
// Getting One
router.get("/:id", (req, res) => {
  req.params.id;
});
// Creating One
router.post("/", (req, res) => {});
// Updating One
router.patch("/:id", (req, res) => {});
// Deleting One
router.delete("/:id", (req, res) => {});

// exporting our routes
module.exports = router;
