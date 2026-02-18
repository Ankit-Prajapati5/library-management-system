const mongoose = require("mongoose");

const fineSchema = new mongoose.Schema(
  {
    issueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue"
    },
    amount: Number,
    paid: {
      type: Boolean,
      default: false
    },
    paidDate: Date,
    remarks: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fine", fineSchema);
