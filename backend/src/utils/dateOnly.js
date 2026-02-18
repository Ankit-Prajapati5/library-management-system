// backend/utils/dateOnly.js

// YYYY-MM-DD ko stable UTC date me convert karega
exports.toUTCDateOnly = (dateString) => {
  if (!dateString) return null;

  const [year, month, day] = dateString.split("-").map(Number);

  // Noon UTC store karte hain (timezone safe)
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
};
