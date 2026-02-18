import { useEffect, useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import "../../css/ReportPage.css";

function OverdueReport() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/reports/overdue")
      .then(res => setData(res.data))
      .catch(() => setError("Failed to load overdue records"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Navbar />

      <div className="report-page">
        <div className="report-card">

          <h2 className="report-title">Overdue Returns</h2>

          {loading && <p className="loading">Loading...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && <Table data={data} />}

        </div>
      </div>

    </div>
  );
}

export default OverdueReport;
