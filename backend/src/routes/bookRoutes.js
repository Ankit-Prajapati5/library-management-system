const express = require("express");
const router = express.Router();
const { addBook, updateBook } = require("../controllers/bookController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/add", protect, adminOnly, addBook);
router.put("/update", protect, adminOnly, updateBook);

module.exports = router;
