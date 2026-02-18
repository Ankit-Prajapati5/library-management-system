import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../css/Login.css";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ⭐ NEW STATE

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // ⭐ Spinner start

    try {
      const { data } = await API.post("/auth/login", form);
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false); // ⭐ Spinner stop
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Library Login</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            required
            disabled={loading}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            disabled={loading}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button type="submit" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Login"}
          </button>

        </form>

        <p className="switch-auth">
          New admin? <Link to="/register">Create account</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
