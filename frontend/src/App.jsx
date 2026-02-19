import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Maintenance from "./pages/maintenance/Maintenance";
import AddMembership from "./pages/maintenance/AddMembership";
import UpdateMembership from "./pages/maintenance/UpdateMembership";
import AddBook from "./pages/maintenance/AddBook";
import UpdateBook from "./pages/maintenance/UpdateBook";
import UserManagement from "./pages/maintenance/UserManagement";
import Transactions from "./pages/transactions/Transactions";
import Availability from "./pages/transactions/Availability";
import IssueBook from "./pages/transactions/IssueBook";
import ReturnBook from "./pages/transactions/ReturnBook";
import PayFine from "./pages/transactions/PayFine";
import Reports from "./pages/reports/ReportPage";
import BooksReport from "./pages/reports/BooksReport";
import MoviesReport from "./pages/reports/MoviesReport";
import MembershipReport from "./pages/reports/MembershipReport";
import ActiveIssuesReport from "./pages/reports/ActiveIssuesReport";
import OverdueReport from "./pages/reports/OverDueReport";
import AllIssuesReport from "./pages/reports/AllIssuesReport";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/maintenance/add-membership" element={<AddMembership />} />
        <Route path="/maintenance/update-membership" element={<UpdateMembership />} />
        <Route path="/maintenance/add-book" element={<AddBook />} />
        <Route path="/maintenance/update-book" element={<UpdateBook />} />
        <Route path="/maintenance/user-management" element={<UserManagement />} />

        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/availability" element={<Availability />} />
        <Route path="/transactions/issue" element={<IssueBook />} />
        <Route path="/transactions/return" element={<ReturnBook />} />
        <Route path="/transactions/payfine" element={<PayFine />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/books" element={<BooksReport />} />
        <Route path="/reports/movies" element={<MoviesReport />} />
        <Route path="/reports/memberships" element={<MembershipReport />} />
        <Route path="/reports/active" element={<ActiveIssuesReport />} />
        <Route path="/reports/overdue" element={<OverdueReport />} />
        <Route path="/reports/all-issues" element={<AllIssuesReport />} />

        
      </Route>

    </Routes>
  );
}

export default App;
