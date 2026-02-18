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

  // hide only __v
  const headers = Object.keys(data[0]).filter(key => key !== "__v");

  // 🔥 detect if fine applicable
  const hasDueDate = headers.includes("dueDate");

  /* ---------------- HEADER FORMAT ---------------- */
  const formatHeader = (key) => {

    const map = {
      _id: "ID",
      membershipId: "Membership ID",
      bookSerialNo: "Serial No",
      fineCalculated: "Fine (₹)",
      issueDate: "Issue Date",
      dueDate: "Due Date",
      returnDate: "Return Date",
      paidDate: "Paid Date",
      procurementDate: "Added On",
      createdAt: "Created",
      updatedAt: "Updated",
    };

    if (map[key]) return map[key];

    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, s => s.toUpperCase());
  };

  /* ---------------- CALCULATE LIVE FINE ---------------- */
  const calculateFine = (row) => {
    if (!row.dueDate || row.status === "returned") return 0;

    const today = new Date().setHours(0,0,0,0);
    const due = new Date(row.dueDate).setHours(0,0,0,0);

    if (today <= due) return 0;

    const diffDays = Math.floor((today - due) / (1000 * 60 * 60 * 24));
    return diffDays * 10;
  };

  /* ---------------- VALUE FORMAT ---------------- */
  const formatValue = (value) => {

    if (value === null || value === undefined)
      return "-";

    if (typeof value === "boolean")
      return value ? "Yes" : "No";

    // STATUS BADGE
    if (typeof value === "string") {
      const statusColors = {
        available: "blue",
        issued: "red",
        returned: "green",
        active: "green",
        inactive: "gray",
        paid: "green",
        unpaid: "orange",
        lost: "darkred"
      };

      const lower = value.toLowerCase();
      if (statusColors[lower]) {
        return (
          <span className={`status-badge ${statusColors[lower]}`}>
            {value}
          </span>
        );
      }
    }

    // DATE FORMAT
    if (typeof value === "string" && value.includes("T") && !isNaN(Date.parse(value))) {
      return new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    }

    if (value instanceof Date) {
      return new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    }

    return String(value);
  };

  /* ================= MOBILE VIEW ================= */
  if (isMobile) {
    return (
      <div className="card-list">
        {data.map((row, i) => {
          const fineToday = calculateFine(row);

          return (
            <div
              key={i}
              className={`data-card ${fineToday > 0 ? "late-card" : ""}`}
            >
              {headers.map(h => (
                <p key={h}>
                  <strong>{formatHeader(h)}:</strong> {formatValue(row[h])}
                </p>
              ))}

              {hasDueDate && fineToday > 0 && (
                <p className="fine-preview">
                  <strong>Fine Today:</strong> ₹{fineToday}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  /* ================= DESKTOP TABLE ================= */
  return (
    <div className="table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            {headers.map(h => <th key={h}>{formatHeader(h)}</th>)}
            {hasDueDate && <th>Fine Today</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {

            const fineToday = calculateFine(row);

            return (
              <tr key={i} className={fineToday > 0 ? "late-row" : ""}>
                {headers.map(h => (
                  <td key={h}>{formatValue(row[h])}</td>
                ))}

                {hasDueDate && (
                  <td className="fine-cell">
                    {fineToday > 0 ? `₹${fineToday}` : "-"}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
