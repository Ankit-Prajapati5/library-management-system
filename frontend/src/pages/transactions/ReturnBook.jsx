import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import "../../css/ReturnBook.css";

/* ================= VALIDATION ================= */
const validate = (serialNo, returnDate) => {
  const errors = {};

  if (!serialNo || !/^[A-Za-z0-9_-]+$/.test(serialNo))
    errors.serialNo = "Invalid Serial Number";

  if (returnDate && new Date(returnDate) > new Date())
    errors.returnDate = "Future date not allowed";

  return errors;
};

function ReturnBook() {

  const [serialNo, setSerialNo] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [errors, setErrors] = useState({});
  const [fine, setFine] = useState(null);
const [loadingFine, setLoadingFine] = useState(false);

  const navigate = useNavigate();

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(serialNo, returnDate);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const { data } = await API.post("/transactions/return", {
        serialNo,
        returnDate
      });

      navigate("/transactions/payfine", { state: data });

    } catch {
      setErrors({ serialNo: "Return failed or book not found" });
    }
  };
const fetchFinePreview = async (sn, date) => {
  if (!sn) return;

  try {
    setLoadingFine(true);

    const { data } = await API.post("/transactions/previewfine", {
      serialNo: sn,
      returnDate: date
    });

    setFine(data);

  } catch {
    setFine(null);
  } finally {
    setLoadingFine(false);
  }
};

  return (
    <div>
      <Navbar />

      <div className="return-page">
        <div className="return-card">

          <h3 className="return-title">Return Book</h3>

          <form onSubmit={handleSubmit}>

            {/* SERIAL NO */}
            <div className="form-group">
              <input
                value={serialNo}
                placeholder="Serial No (e.g. BK-102A)"
                onChange={(e)=>{
  setSerialNo(e.target.value);
  fetchFinePreview(e.target.value, returnDate);
}}

              />
              {errors.serialNo && <p className="error">{errors.serialNo}</p>}
            </div>
            {fine && (
  <div className={`fine-box ${fine.fine > 0 ? "due" : "clear"}`}>
    {loadingFine
      ? "Checking..."
      : fine.fine > 0
        ? <>Fine if returned today: ₹{fine.fine}</>
        : <>No fine — return on time</>}
  </div>
)}


            {/* RETURN DATE - MOBILE FIX */}
            <div className="form-group">
              <input
                type="date"
                value={returnDate}
                onChange={(e)=>{
  setReturnDate(e.target.value);
  fetchFinePreview(serialNo, e.target.value);
}}
                onFocus={(e)=>e.target.showPicker?.()}
              />
              {errors.returnDate && <p className="error">{errors.returnDate}</p>}
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

export default ReturnBook;
