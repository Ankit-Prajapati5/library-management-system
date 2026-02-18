import { useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import "../../css/IssueBook.css";

/* VALIDATION */
const validate = (form) => {
  const errors = {};

  if (!/^\d+$/.test(form.membershipId))
    errors.membershipId = "Membership ID must be numeric";

  if (!/^\d+$/.test(form.serialNo))
    errors.serialNo = "Serial No must be numeric";

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
      setForm({ membershipId:"", serialNo:"", issueDate:"", remarks:"" });
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

          {message && <p className={success ? "success" : "error"}>{message}</p>}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <input
                value={form.membershipId}
                placeholder="Membership ID"
                onChange={(e)=>{
                  if(/^\d*$/.test(e.target.value))
                    setForm({...form,membershipId:e.target.value});
                }}
              />
              {errors.membershipId && <p className="error">{errors.membershipId}</p>}
            </div>

            <div className="form-group">
              <input
                value={form.serialNo}
                placeholder="Serial No"
                onChange={(e)=>{
                  if(/^\d*$/.test(e.target.value))
                    setForm({...form,serialNo:e.target.value});
                }}
              />
              {errors.serialNo && <p className="error">{errors.serialNo}</p>}
            </div>

            <div className="form-group">
              <input
                type="date"
                value={form.issueDate}
                onChange={(e)=>setForm({...form,issueDate:e.target.value})}
              />
              {errors.issueDate && <p className="error">{errors.issueDate}</p>}
            </div>

            <div className="form-group">
              <textarea
                value={form.remarks}
                placeholder="Remarks (optional)"
                onChange={(e)=>setForm({...form,remarks:e.target.value})}
              />
            </div>

            <button className="submit-btn" type="submit">Confirm</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default IssueBook;
