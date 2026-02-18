import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import "../css/Login.css";

function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false); // ⭐ NEW
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true); // ⭐ start spinner

    try {
      const res = await API.post("/auth/register", form);
      setMsg(res.data.message);

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    } finally {
      setLoading(false); // ⭐ stop spinner
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Create Admin Account</h2>

        {msg && <p className="error">{msg}</p>}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name"
            required
            disabled={loading}
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input
            type="email"
            placeholder="Email"
            required
            disabled={loading}
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <input
            type="password"
            placeholder="Password"
            required
            disabled={loading}
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />

          <button type="submit" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Create Account"}
          </button>

        </form>

        <p className="switch-auth">
          Already have account? <Link to="/">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
