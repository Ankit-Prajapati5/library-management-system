const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    membershipId: {
      type: String,
      required: true
    },
    bookSerialNo: {
      type: String,
      required: true
    },
    bookName: String,
    author: String,
    issueDate: {
      type: Date,
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    returnDate: Date,
    status: {
      type: String,
      enum: ["active", "returned"],
      default: "active"
    },
    fineCalculated: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
