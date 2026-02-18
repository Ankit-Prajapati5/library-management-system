import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../css/ReportPage.css";

function ReportPage() {
  return (
    <div>
      <Navbar />

      <div className="reports-page">
        <div className="reports-container">

          <h2 className="reports-title">Reports</h2>

          <div className="reports-grid">

            <Link to="/reports/books" className="report-card">
              <h3>Master List Books</h3>
            </Link>

            <Link to="/reports/movies" className="report-card">
              <h3>Master List Movies</h3>
            </Link>

            <Link to="/reports/memberships" className="report-card">
              <h3>Master List Memberships</h3>
            </Link>

            <Link to="/reports/active" className="report-card">
              <h3>Active Issues</h3>
            </Link>

            <Link to="/reports/overdue" className="report-card">
              <h3>Overdue Returns</h3>
            </Link>

            <Link to="/reports/all-issues" className="report-card">
              <h3>All Issues</h3>
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ReportPage;
