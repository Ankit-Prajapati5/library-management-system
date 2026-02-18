import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="dashboard-card">

          <div className="welcome">
            <h2>Welcome {user?.name}</h2>
            <p className="role">Role: {user?.role}</p>
          </div>

          {/* ADMIN */}
          {user?.role === "admin" && (
  <>
    <h3 className="section-title">Maintenance</h3>
    <div className="card-grid">
      <Link to="/maintenance" className="feature-card"><h4>Manage Books</h4></Link>
      <Link to="/maintenance" className="feature-card"><h4>Manage Movies</h4></Link>
      <Link to="/maintenance" className="feature-card"><h4>Manage Memberships</h4></Link>
    </div>
  </>
)}


          {/* TRANSACTIONS */}
         <h3 className="section-title">Transactions</h3>
<div className="card-grid">
  <Link to="/transactions" className="feature-card"><h4>Issue Book</h4></Link>
  <Link to="/transactions" className="feature-card"><h4>Return Book</h4></Link>
  <Link to="/transactions" className="feature-card"><h4>Pay Fine</h4></Link>
</div>


          {/* REPORTS */}
          <h3 className="section-title">Reports</h3>
<div className="card-grid">
  <Link to="/reports" className="feature-card"><h4>Books Report</h4></Link>
  <Link to="/reports" className="feature-card"><h4>Active Issues</h4></Link>
  <Link to="/reports" className="feature-card"><h4>Overdue</h4></Link>
</div>


          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>
      </div>
    </>
  );
}

export default Dashboard;
