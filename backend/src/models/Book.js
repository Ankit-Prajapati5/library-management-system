const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    serialNo: {
      type: String,
      unique: true
    },
    type: {
      type: String,
      enum: ["book", "movie"],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    procurementDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["available", "issued", "lost"],
      default: "available"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
