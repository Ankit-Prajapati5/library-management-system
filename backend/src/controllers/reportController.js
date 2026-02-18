const Book = require("../models/Book");
const Membership = require("../models/Membership");
const Issue = require("../models/Issue");


// Master List Books
exports.getBooksReport = async (req, res) => {
  const books = await Book.find({ type: "book" });
  res.json(books);
};


// Master List Movies
exports.getMoviesReport = async (req, res) => {
  const movies = await Book.find({ type: "movie" });
  res.json(movies);
};


// Master List Memberships
exports.getMembershipReport = async (req, res) => {
  const memberships = await Membership.find();
  res.json(memberships);
};


// Active Issues
exports.getActiveIssues = async (req, res) => {
  const activeIssues = await Issue.find({ status: "active" });
  res.json(activeIssues);
};


// Overdue Returns
exports.getOverdue = async (req, res) => {
  const today = new Date();

  const overdue = await Issue.find({
    status: "active",
    dueDate: { $lt: today }
  });

  res.json(overdue);
};


// Issue Requests (All issues)
exports.getAllIssues = async (req, res) => {
  const issues = await Issue.find();
  res.json(issues);
};
