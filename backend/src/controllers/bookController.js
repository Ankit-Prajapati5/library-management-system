const Book = require("../models/Book");
const generateSerialNo = require("../utils/generateSerialNo");
const { toUTCDateOnly } = require("../utils/dateOnly");


// Add Book / Movie
exports.addBook = async (req, res) => {
  try {
    const { type, name, author, procurementDate, quantity } = req.body;

    if (!type || !name || !author || !procurementDate || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const createdBooks = [];

    for (let i = 0; i < quantity; i++) {
      const serialNo = await generateSerialNo(type);

      const book = await Book.create({
  serialNo,
  type,
  name,
  author,
  procurementDate: toUTCDateOnly(procurementDate)
});


      createdBooks.push(book);
    }

    res.status(201).json(createdBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Book / Movie
exports.updateBook = async (req, res) => {
  try {
    const { type, name, serialNo, status, date } = req.body;

    if (!type || !name || !serialNo || !status || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const book = await Book.findOne({ serialNo });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.type = type;
    book.name = name;
    book.status = status;
    book.procurementDate = toUTCDateOnly(date);


    await book.save();

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
