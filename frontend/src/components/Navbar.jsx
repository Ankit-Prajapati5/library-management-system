import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../css/Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <NavLink to="/dashboard" className="logo">Library</NavLink>
      </div>

      {/* CENTER */}
      <div className="nav-center nav-links">

        {user?.role === "admin" && (
          <NavLink to="/maintenance">Maintenance</NavLink>
        )}

        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/reports">Reports</NavLink>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <button className="logout-btn-nav" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  );
}

export default Navbar;
