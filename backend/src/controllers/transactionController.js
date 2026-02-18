const Book = require("../models/Book");
const Issue = require("../models/Issue");
const Fine = require("../models/Fine");
const Membership = require("../models/Membership");
const { toUTCDateOnly } = require("../utils/dateOnly");

// Book Availability
exports.checkAvailability = async (req, res) => {
  const { name, author } = req.body;

  if (!name && !author) {
    return res.status(400).json({
      message: "Please select Book Name or Author",
    });
  }

  const query = {
    status: "available",
  };

  if (name) query.name = name;
  if (author) query.author = author;

  const books = await Book.find(query);

  res.json(books);
};

// Issue Book
exports.issueBook = async (req, res) => {
  const { membershipId, serialNo, issueDate } = req.body;

  if (!membershipId || !serialNo || !issueDate) {
    return res.status(400).json({ message: "All required fields missing" });
  }

  const membership = await Membership.findOne({ membershipId });
  if (!membership || membership.status !== "active") {
    return res.status(400).json({ message: "Invalid membership" });
  }

  // 🔥 NEW RULE: max 5 books
  const activeIssues = await Issue.countDocuments({
    membershipId,
    status: "active",
  });

  if (activeIssues >= 5) {
    return res.status(400).json({
      message: "Issue limit reached (max 5 books allowed)",
    });
  }

  const book = await Book.findOne({ serialNo });
  if (!book || book.status !== "available") {
    return res.status(400).json({ message: "Book not available" });
  }

  // timezone safe date
  const issueUTC = toUTCDateOnly(issueDate);

  // today date compare
  const todayUTC = toUTCDateOnly(new Date().toISOString().split("T")[0]);

  if (issueUTC < todayUTC) {
    return res
      .status(400)
      .json({ message: "Issue date cannot be before today" });
  }

  // due date = +15 days (UTC safe)
  const dueDate = new Date(issueUTC);
  dueDate.setUTCDate(dueDate.getUTCDate() + 15);

  const newIssue = await Issue.create({
    membershipId,
    bookSerialNo: serialNo,
    bookName: book.name,
    author: book.author,
    issueDate: issueUTC,
    dueDate,
  });

  book.status = "issued";
  await book.save();

  res.status(201).json(newIssue);
};

// Return Book
exports.returnBook = async (req, res) => {
  const { serialNo, returnDate } = req.body;

  if (!serialNo) {
    return res.status(400).json({ message: "Serial number required" });
  }

  const issue = await Issue.findOne({
    bookSerialNo: serialNo,
    status: "active",
  });

  if (!issue) {
    return res.status(404).json({ message: "Active issue not found" });
  }

  // timezone safe return date
  const actualReturn = toUTCDateOnly(returnDate);
  issue.returnDate = actualReturn;

  const due = issue.dueDate;

  let fine = 0;

  if (actualReturn > due) {
    // correct day difference calculation
    const diffDays = Math.floor(
      (actualReturn.getTime() - due.getTime()) / (1000 * 60 * 60 * 24),
    );

    fine = diffDays * 10;
  }

  issue.fineCalculated = fine;
  await issue.save();

  const fineRecord = await Fine.create({
    issueId: issue._id,
    amount: fine,
  });

  res.json({
    message: "Proceed to fine payment",
    fineAmount: fine,
    issueId: issue._id,
  });
};

// Pay Fine
exports.payFine = async (req, res) => {
  const { issueId, paid, remarks } = req.body;

  const fine = await Fine.findOne({ issueId });

  if (!fine) {
    return res.status(404).json({ message: "Fine record not found" });
  }

  if (fine.amount > 0 && !paid) {
    return res.status(400).json({
      message: "Fine must be paid before completing return",
    });
  }

  fine.paid = true;
  fine.paidDate = toUTCDateOnly(new Date().toISOString().split("T")[0]);
  fine.remarks = remarks;

  await fine.save();

  const issue = await Issue.findById(issueId);
  issue.status = "returned";
  await issue.save();

  const book = await Book.findOne({ serialNo: issue.bookSerialNo });
  book.status = "available";
  await book.save();

  res.json({ message: "Book returned successfully" });
};

// 5️⃣ Preview Fine
exports.previewFine = async (req, res) => {
  const { serialNo, returnDate } = req.body;

  if (!serialNo)
    return res.status(400).json({ message: "Serial required" });

  const issue = await Issue.findOne({
    bookSerialNo: serialNo,
    status: "active"
  });

  if (!issue)
    return res.status(404).json({ message: "Active issue not found" });

  const actualReturn = returnDate
    ? new Date(returnDate)
    : new Date();

  const due = new Date(issue.dueDate);

  let fine = 0;

  if (actualReturn > due) {
    const diffDays = Math.floor((actualReturn - due) / (1000*60*60*24));
    fine = diffDays * 10;
  }

  res.json({
    fine,
    dueDate: issue.dueDate
  });
};
