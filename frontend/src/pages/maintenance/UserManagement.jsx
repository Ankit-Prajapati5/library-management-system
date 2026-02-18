import { useState } from "react";
import Navbar from "../../components/Navbar";
import "../../css/UserManagement.css";

/* VALIDATION */
const validate = (name) => {
  const errors = {};
  if (!/^[A-Za-z\s]{2,}$/.test(name))
    errors.name = "Enter valid name (letters only)";
  return errors;
};

function UserManagement() {

  const [form, setForm] = useState({
    type: "new",
    name: "",
    isActive: true,
    isAdmin: false
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    const validationErrors = validate(form.name);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSuccess(true);
    setMessage("User processed (Backend API connect next)");
    setForm({ type:"new", name:"", isActive:true, isAdmin:false });
  };

  return (
    <div>
      <Navbar />

      <div className="usermgmt-page">
        <div className="usermgmt-card">

          <h3 className="usermgmt-title">User Management</h3>

          {message && <p className={success ? "success" : "error"}>{message}</p>}

          <form onSubmit={handleSubmit}>

            <div className="option-group">
              <label>
                <input type="radio"
                  checked={form.type==="new"}
                  onChange={()=>setForm({...form,type:"new"})}/>
                New User
              </label>

              <label>
                <input type="radio"
                  checked={form.type==="existing"}
                  onChange={()=>setForm({...form,type:"existing"})}/>
                Existing User
              </label>
            </div>

            <div className="form-group">
              <input
                value={form.name}
                placeholder="Name"
                onChange={(e)=>{
                  if(/^[A-Za-z\s]*$/.test(e.target.value))
                    setForm({...form,name:e.target.value});
                }}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="option-group">
              <label>
                <input type="checkbox"
                  checked={form.isActive}
                  onChange={(e)=>setForm({...form,isActive:e.target.checked})}/>
                Active
              </label>

              <label>
                <input type="checkbox"
                  checked={form.isAdmin}
                  onChange={(e)=>setForm({...form,isAdmin:e.target.checked})}/>
                Admin
              </label>
            </div>

            <button className="submit-btn" type="submit">Confirm</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
