const express = require("express");
const router = express.Router();

const {
  getBooksReport,
  getMoviesReport,
  getMembershipReport,
  getActiveIssues,
  getOverdue,
  getAllIssues
} = require("../controllers/reportController");

const { protect } = require("../middleware/authMiddleware");

router.get("/books", protect, getBooksReport);
router.get("/movies", protect, getMoviesReport);
router.get("/memberships", protect, getMembershipReport);
router.get("/active-issues", protect, getActiveIssues);
router.get("/overdue", protect, getOverdue);
router.get("/all-issues", protect, getAllIssues);

module.exports = router;
