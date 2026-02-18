const Counter = require("../models/Counter");

const generateMembershipId = async () => {
  const year = new Date().getFullYear();

  let counter = await Counter.findOne({ name: "membership", year });

  if (!counter) {
    counter = await Counter.create({
      name: "membership",
      year,
      seq: 1
    });
  } else {
    counter.seq += 1;
    await counter.save();
  }

  const seqString = counter.seq.toString().padStart(5, "0");

  return `MBR-${year}-${seqString}`;
};

module.exports = generateMembershipId;
