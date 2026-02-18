import "../css/Table.css";
import { useEffect, useState } from "react";

function Table({ data }) {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data || data.length === 0)
    return <div className="empty">No Data Available</div>;

  const headers = Object.keys(data[0]);

  const formatValue = (value) => {
    if (typeof value === "boolean") return value ? "✔" : "✖";
    if (value === null || value === undefined) return "-";
    return String(value);
  };

  // MOBILE CARD VIEW
  if (isMobile) {
    return (
      <div className="card-list">
        {data.map((row, i) => (
          <div key={i} className="data-card">
            {headers.map(h => (
              <p key={h}>
                <strong>{h}:</strong> {formatValue(row[h])}
              </p>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // DESKTOP TABLE VIEW
  return (
    <div className="table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            {headers.map(h => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {headers.map(h => <td key={h}>{formatValue(row[h])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
