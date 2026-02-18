import { useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import "../../css/UpdateBook.css";

/* ================= VALIDATION ================= */
const validate = (form) => {
  const errors = {};

  // Name validation
  if (!form.name || form.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters";

  // Serial validation (alphanumeric allowed)
  if (!form.serialNo || !/^[A-Za-z0-9_-]+$/.test(form.serialNo))
    errors.serialNo = "Serial must contain letters or numbers only";

  // Date validation
  if (!form.date)
    errors.date = "Select date";
  else if (new Date(form.date) > new Date())
    errors.date = "Future date not allowed";

  return errors;
};

function UpdateBook() {

  const [form, setForm] = useState({
    type: "book",
    name: "",
    serialNo: "",
    status: "available",
    date: ""
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
      await API.put("/books/update", form);
      setSuccess(true);
      setMessage("Book updated successfully");

      setForm({
        type:"book",
        name:"",
        serialNo:"",
        status:"available",
        date:""
      });

    } catch (err) {
      setSuccess(false);
      setMessage(err.response?.data?.message || "Error updating book");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="updatebook-page">
        <div className="updatebook-card">

          <h3 className="updatebook-title">Update Book / Movie</h3>

          {message && (
            <p className={success ? "success" : "error"}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>

            {/* TYPE */}
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  checked={form.type==="book"}
                  onChange={()=>setForm({...form,type:"book"})}
                />
                Book
              </label>

              <label>
                <input
                  type="radio"
                  checked={form.type==="movie"}
                  onChange={()=>setForm({...form,type:"movie"})}
                />
                Movie
              </label>
            </div>

            {/* NAME */}
            <div className="form-group">
              <input
                value={form.name}
                placeholder="Name"
                onChange={(e)=>
                  setForm({...form,name:e.target.value})
                }
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            {/* SERIAL NO */}
            <div className="form-group">
              <input
                value={form.serialNo}
                placeholder="Serial No (e.g. BK-102A)"
                onChange={(e)=>
                  setForm({...form,serialNo:e.target.value})
                }
              />
              {errors.serialNo && <p className="error">{errors.serialNo}</p>}
            </div>

            {/* STATUS */}
            <div className="form-group">
              <select
                value={form.status}
                onChange={(e)=>setForm({...form,status:e.target.value})}
              >
                <option value="available">Available</option>
                <option value="issued">Issued</option>
                <option value="lost">Lost</option>
              </select>
            </div>

            {/* DATE */}
            <div className="form-group">
              <input
                type="date"
                value={form.date}
                onChange={(e)=>setForm({...form,date:e.target.value})}
              />
              {errors.date && <p className="error">{errors.date}</p>}
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

export default UpdateBook;
