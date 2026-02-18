import { useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import "../../css/AddBook.css";

/* VALIDATION */
const validate = (form) => {
  const errors = {};

  if (!/^[A-Za-z0-9\s]{2,}$/.test(form.name))
    errors.name = "Enter valid name";

  if (!/^[A-Za-z\s]{2,}$/.test(form.author))
    errors.author = "Author name invalid";

  if (!form.procurementDate)
    errors.procurementDate = "Select date";
  else if (new Date(form.procurementDate) > new Date())
    errors.procurementDate = "Future date not allowed";

  if (!form.quantity || form.quantity < 1)
    errors.quantity = "Quantity must be at least 1";

  return errors;
};

function AddBook() {

  const [form, setForm] = useState({
    type: "book",
    name: "",
    author: "",
    procurementDate: "",
    quantity: 1
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      await API.post("/books/add", form);
      setSuccess(true);
      setMessage("Book/Movie added successfully");
      setForm({ type:"book", name:"", author:"", procurementDate:"", quantity:1 });
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

            <div className="radio-group">
              <label>
                <input type="radio"
                  checked={form.type==="book"}
                  onChange={()=>setForm({...form,type:"book"})}/>
                Book
              </label>

              <label>
                <input type="radio"
                  checked={form.type==="movie"}
                  onChange={()=>setForm({...form,type:"movie"})}/>
                Movie
              </label>
            </div>

            <div className="form-group">
              <input
                value={form.name}
                placeholder="Name"
                onChange={(e)=>{
                  if(/^[A-Za-z0-9\s]*$/.test(e.target.value))
                    setForm({...form,name:e.target.value});
                }}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <input
                value={form.author}
                placeholder="Author"
                onChange={(e)=>{
                  if(/^[A-Za-z\s]*$/.test(e.target.value))
                    setForm({...form,author:e.target.value});
                }}
              />
              {errors.author && <p className="error">{errors.author}</p>}
            </div>

            <div className="form-group">
              <input
                type="date"
                value={form.procurementDate}
                onChange={(e)=>setForm({...form,procurementDate:e.target.value})}
              />
              {errors.procurementDate && <p className="error">{errors.procurementDate}</p>}
            </div>

            <div className="form-group">
              <input
                type="number"
                min="1"
                value={form.quantity}
                onChange={(e)=>{
                  if(e.target.value >= 1)
                    setForm({...form,quantity:e.target.value});
                }}
              />
              {errors.quantity && <p className="error">{errors.quantity}</p>}
            </div>

            <button className="submit-btn" type="submit">Confirm</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
