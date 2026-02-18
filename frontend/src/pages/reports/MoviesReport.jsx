import { useEffect, useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import "../../css/ReportPage.css";

function MoviesReport() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/reports/movies")
      .then(res => setData(res.data))
      .catch(() => setError("Failed to load movies"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Navbar />

      <div className="report-page">
        <div className="report-card">

          <h2 className="report-title">Master List Movies</h2>

          {loading && <p className="loading">Loading...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && <Table data={data} />}

        </div>
      </div>

    </div>
  );
}

export default MoviesReport;
