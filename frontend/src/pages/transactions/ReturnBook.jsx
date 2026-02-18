import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import "../../css/ReturnBook.css";

/* VALIDATION */
const validate = (serialNo, returnDate) => {
  const errors = {};

  if (!/^\d+$/.test(serialNo))
    errors.serialNo = "Serial No must be numeric";

  if (returnDate && new Date(returnDate) > new Date())
    errors.returnDate = "Future date not allowed";

  return errors;
};

function ReturnBook() {

  const [serialNo, setSerialNo] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

  return (
    <div>
      <Navbar />

      <div className="return-page">
        <div className="return-card">

          <h3 className="return-title">Return Book</h3>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <input
                value={serialNo}
                placeholder="Serial No"
                onChange={(e)=>{
                  if(/^\d*$/.test(e.target.value))
                    setSerialNo(e.target.value);
                }}
              />
              {errors.serialNo && <p className="error">{errors.serialNo}</p>}
            </div>

            <div className="form-group">
              <input
                type="date"
                value={returnDate}
                onChange={(e)=>setReturnDate(e.target.value)}
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
