import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../css/Maintenance.css";

function Maintenance() {
  return (
    <div>
      <Navbar />

      <div className="maintenance-page">
        <div className="maintenance-container">
          <h2 className="maintenance-title">Maintenance Module</h2>

          <div className="maintenance-grid">
            <Link to="/maintenance/add-membership" className="maintenance-card">
              <h3>Add Membership</h3>
            </Link>

            <Link to="/maintenance/update-membership" className="maintenance-card">
              <h3>Update Membership</h3>
            </Link>

            <Link to="/maintenance/add-book" className="maintenance-card">
              <h3>Add Book / Movie</h3>
            </Link>

            <Link to="/maintenance/update-book" className="maintenance-card">
              <h3>Update Book / Movie</h3>
            </Link>

            <Link to="/maintenance/user-management" className="maintenance-card">
              <h3>User Management</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
