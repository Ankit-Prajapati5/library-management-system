import { useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import "../../css/AddBook.css";

/* ================= VALIDATION ================= */
const validate = (form) => {
  const errors = {};

  if (!form.name || form.name.trim().length < 2)
    errors.name = "Enter valid name (min 2 characters)";

  if (!form.author || form.author.trim().length < 2)
    errors.author = "Enter valid author name";

  if (!form.procurementDate) errors.procurementDate = "Select date";
  else if (new Date(form.procurementDate) > new Date())
    errors.procurementDate = "Future date not allowed";

  // quantity fix (string → number convert)
  const qty = Number(form.quantity);
  if (!form.quantity || isNaN(qty) || qty < 1)
    errors.quantity = "Quantity must be at least 1";

  return errors;
};

function AddBook() {
  const [form, setForm] = useState({
    type: "book",
    name: "",
    author: "",
    procurementDate: "",
    quantity: "", // IMPORTANT: string for mobile compatibility
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      await API.post("/books/add", {
        ...form,
        quantity: Number(form.quantity), // send number to backend
      });

      setSuccess(true);
      setMessage("Book/Movie added successfully");

      setForm({
        type: "book",
        name: "",
        author: "",
        procurementDate: "",
        quantity: "",
      });
    } catch (err) {
      setSuccess(false);
      setMessage(err.response?.data?.message || "Error adding item");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="book-page">
        <div className="book-card">
          <h3 className="book-title">Add Book / Movie</h3>

          {message && (
            <p className={success ? "success" : "error"}>{message}</p>
          )}

          <form onSubmit={handleSubmit}>
            {/* TYPE */}
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  checked={form.type === "book"}
                  onChange={() => setForm({ ...form, type: "book" })}
                />
                Book
              </label>

              <label>
                <input
                  type="radio"
                  checked={form.type === "movie"}
                  onChange={() => setForm({ ...form, type: "movie" })}
                />
                Movie
              </label>
            </div>

            {/* NAME */}
            <div className="form-group">
              <input
                value={form.name}
                placeholder="Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            {/* AUTHOR */}
            <div className="form-group">
              <input
                value={form.author}
                placeholder="Author"
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
              {errors.author && <p className="error">{errors.author}</p>}
            </div>

            {/* DATE */}
            <div className="form-group">
              <input
                type="date"
                value={form.procurementDate}
                onChange={(e) =>
                  setForm({ ...form, procurementDate: e.target.value })
                }
                onFocus={(e) => e.target.showPicker?.()}
              />
              {errors.procurementDate && (
                <p className="error">{errors.procurementDate}</p>
              )}
            </div>

            {/* QUANTITY (FIXED MOBILE INPUT) */}
            <div className="form-group">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) => {
                  const value = e.target.value;

                  // allow only digits
                  if (/^(0|[1-9]\d*)?$/.test(value)) {
                    setForm({ ...form, quantity: value });
                  }
                }}
              />

              {errors.quantity && <p className="error">{errors.quantity}</p>}
            </div>

            <button className="submit-btn" type="submit">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
