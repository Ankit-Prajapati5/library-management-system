const Counter = require("../models/Counter");

const generateSerialNo = async (type) => {
  const year = new Date().getFullYear();
  const counterName = type === "book" ? "book" : "movie";

  let counter = await Counter.findOne({ name: counterName, year });

  if (!counter) {
    counter = await Counter.create({
      name: counterName,
      year,
      seq: 1
    });
  } else {
    counter.seq += 1;
    await counter.save();
  }

  const seqString = counter.seq.toString().padStart(5, "0");
  const prefix = type === "book" ? "BK" : "MV";

  return `${prefix}-${year}-${seqString}`;
};

module.exports = generateSerialNo;
