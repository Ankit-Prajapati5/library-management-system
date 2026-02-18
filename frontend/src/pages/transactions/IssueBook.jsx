import { useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import "../../css/IssueBook.css";

/* ================= VALIDATION ================= */
const validate = (form) => {
  const errors = {};

  // Membership ID (alphanumeric allowed)
  if (!form.membershipId || !/^[A-Za-z0-9_-]+$/.test(form.membershipId))
    errors.membershipId = "Invalid Membership ID";

  // Serial No (alphanumeric allowed)
  if (!form.serialNo || !/^[A-Za-z0-9_-]+$/.test(form.serialNo))
    errors.serialNo = "Invalid Serial Number";

  // Date validation
  if (!form.issueDate)
    errors.issueDate = "Select issue date";
  else if (new Date(form.issueDate) > new Date())
    errors.issueDate = "Future date not allowed";

  return errors;
};

function IssueBook() {

  const [form, setForm] = useState({
    membershipId: "",
    serialNo: "",
    issueDate: "",
    remarks: ""
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
      await API.post("/transactions/issue", form);

      setSuccess(true);
      setMessage("Book issued successfully");

      setForm({
        membershipId:"",
        serialNo:"",
        issueDate:"",
        remarks:""
      });

    } catch (err) {
      setSuccess(false);
      setMessage(err.response?.data?.message || "Error issuing book");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="issue-page">
        <div className="issue-card">

          <h3 className="issue-title">Issue Book</h3>

          {message && (
            <p className={success ? "success" : "error"}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>

            {/* MEMBERSHIP ID */}
            <div className="form-group">
              <input
                value={form.membershipId}
                placeholder="Membership ID (e.g. LIB-001)"
                onChange={(e)=>
                  setForm({...form,membershipId:e.target.value})
                }
              />
              {errors.membershipId && <p className="error">{errors.membershipId}</p>}
            </div>

            {/* SERIAL NO */}
            <div className="form-group">
              <input
                value={form.serialNo}
                placeholder="Serial No (e.g. BK102A)"
                onChange={(e)=>
                  setForm({...form,serialNo:e.target.value})
                }
              />
              {errors.serialNo && <p className="error">{errors.serialNo}</p>}
            </div>

            {/* ISSUE DATE */}
            <div className="form-group">
              <input
                type="date"
                value={form.issueDate}
                onChange={(e)=>setForm({...form,issueDate:e.target.value})}
              />
              {errors.issueDate && <p className="error">{errors.issueDate}</p>}
            </div>

            {/* REMARKS */}
            <div className="form-group">
              <textarea
                value={form.remarks}
                placeholder="Remarks (optional)"
                onChange={(e)=>setForm({...form,remarks:e.target.value})}
              />
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

export default IssueBook;
