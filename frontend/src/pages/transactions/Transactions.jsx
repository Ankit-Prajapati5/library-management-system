import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../css/Transactions.css";

function Transactions() {
  return (
    <div>
      <Navbar />

      <div className="transactions-page">
        <div className="transactions-container">

          <h2 className="transactions-title">Transactions</h2>

          <div className="transactions-grid">

            <Link to="/transactions/availability" className="transaction-card">
              <h3>Book Availability</h3>
            </Link>

            <Link to="/transactions/issue" className="transaction-card">
              <h3>Issue Book</h3>
            </Link>

            <Link to="/transactions/return" className="transaction-card">
              <h3>Return Book</h3>
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Transactions;
