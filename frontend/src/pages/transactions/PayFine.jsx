import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import "../../css/PayFine.css";

function PayFine() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const [paid, setPaid] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  if (!state) return <div className="nodata">No fine data available</div>;

  const handleSubmit = async () => {

    if (state.fineAmount > 0 && !paid) {
      setError("Fine must be paid before completing");
      return;
    }

    try {
      await API.post("/transactions/payfine", {
        issueId: state.issueId,
        paid,
        remarks
      });

      navigate("/transactions");

    } catch {
      setError("Payment failed");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="payfine-page">
        <div className="payfine-card">

          <h3 className="payfine-title">Pay Fine</h3>

          <div className="amount-box">
            Fine Amount: ₹{state.fineAmount}
          </div>

          {error && <p className="error">{error}</p>}

          {state.fineAmount > 0 && (
            <label className="checkbox-group">
              <input
                type="checkbox"
                checked={paid}
                onChange={(e)=>setPaid(e.target.checked)}
              />
              Fine Paid
            </label>
          )}

          <textarea
            placeholder="Remarks (optional)"
            value={remarks}
            onChange={(e)=>setRemarks(e.target.value)}
          />

          <button className="submit-btn" onClick={handleSubmit}>
            Confirm
          </button>

        </div>
      </div>
    </div>
  );
}

export default PayFine;
