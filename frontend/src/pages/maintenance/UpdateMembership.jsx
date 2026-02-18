import { useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import "../../css/UpdateMembership.css";

/* ================= VALIDATION ================= */
const validate = (membershipId) => {
  const errors = {};

  if (!membershipId)
    errors.membershipId = "Membership ID required";

  // Allow: letters + numbers + underscore + hyphen
  else if (!/^[a-zA-Z0-9_-]+$/.test(membershipId))
    errors.membershipId = "Only letters, numbers, _ and - allowed";

  return errors;
};

function UpdateMembership() {

  const [membershipId, setMembershipId] = useState("");
  const [action, setAction] = useState("extend");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const validationErrors = validate(membershipId);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await API.put("/membership/update", {
        membershipId,
        action
      });

      setSuccess(true);
      setMessage("Membership updated successfully");
      setMembershipId("");

    } catch (err) {
      setSuccess(false);
      setMessage(err.response?.data?.message || "Error updating membership");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="update-page">
        <div className="update-card">

          <h3 className="update-title">Update Membership</h3>

          {message && (
            <p className={`message ${success ? "success" : "error"}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>

            {/* Membership ID */}
            <div className="form-group">
              <input
                value={membershipId}
                placeholder="Membership ID (e.g. LIB-001)"
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow alphanumeric + _ -
                  if (/^[a-zA-Z0-9_-]*$/.test(value))
                    setMembershipId(value);
                }}
              />
              {errors.membershipId && (
                <p className="error">{errors.membershipId}</p>
              )}
            </div>

            {/* Action */}
            <div className="radio-group">

              <label>
                <input
                  type="radio"
                  checked={action === "extend"}
                  onChange={() => setAction("extend")}
                />
                Extend (6 months default)
              </label>

              <label>
                <input
                  type="radio"
                  checked={action === "cancel"}
                  onChange={() => setAction("cancel")}
                />
                Cancel Membership
              </label>

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

export default UpdateMembership;
