const express = require("express");
const router = express.Router();
const {
  checkAvailability,
  issueBook,
  returnBook,
  payFine,
  previewFine
} = require("../controllers/transactionController");

const { protect } = require("../middleware/authMiddleware");

router.post("/availability", protect, checkAvailability);
router.post("/issue", protect, issueBook);
router.post("/return", protect, returnBook);
router.post("/payfine", protect, payFine);
router.post("/previewfine", previewFine);


module.exports = router;
