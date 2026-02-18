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
  const [loading, setLoading] = useState(false);

  if (!state)
    return (
      <div>
        <Navbar />
        <div className="payfine-page">
          <div className="payfine-card nodata">
            No fine data available
          </div>
        </div>
      </div>
    );

  const handleSubmit = async () => {

    if (state.fineAmount > 0 && !paid) {
      setError("Please confirm fine payment");
      return;
    }

    try {
      setLoading(true);

      await API.post("/transactions/payfine", {
        issueId: state.issueId,
        paid,
        remarks
      });

      navigate("/transactions");

    } catch {
      setError("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="payfine-page">
        <div className="payfine-card">

          <h3 className="payfine-title">Return Confirmation</h3>

          <div className={`amount-box ${state.fineAmount > 0 ? "due" : "clear"}`}>
            {state.fineAmount > 0
              ? <>Fine Payable: <span>₹{state.fineAmount}</span></>
              : <>No Fine — Book returned on time</>}
          </div>

          {error && <p className="error">{error}</p>}

          {state.fineAmount > 0 && (
            <label className="checkbox-group">
              <input
                type="checkbox"
                checked={paid}
                onChange={(e)=>setPaid(e.target.checked)}
              />
              I confirm payment received
            </label>
          )}

          <div className="form-group">
            <textarea
              placeholder="Remarks (optional)"
              value={remarks}
              onChange={(e)=>setRemarks(e.target.value)}
            />
          </div>

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Complete Return"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default PayFine;
