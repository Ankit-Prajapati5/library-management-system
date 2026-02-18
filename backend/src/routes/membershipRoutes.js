const express = require("express");
const router = express.Router();
const {
  addMembership,
  updateMembership
} = require("../controllers/membershipController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/add", protect, adminOnly, addMembership);
router.put("/update", protect, adminOnly, updateMembership);

module.exports = router;
