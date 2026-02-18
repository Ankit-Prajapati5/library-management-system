import { useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import "../../css/Availability.css";

function Availability() {

  const [form, setForm] = useState({ name: "", author: "" });
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setBooks([]);

    if (!form.name && !form.author) {
      setError("Please enter Book Name or Author");
      return;
    }

    try {
      const { data } = await API.post("/transactions/availability", form);
      setBooks(data);
    } catch {
      setError("Server error while searching");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="availability-page">
        <div className="availability-card">

          <h3 className="title">Book Availability</h3>

          {error && <p className="error">{error}</p>}

          <form className="search-form" onSubmit={handleSearch}>
            <input
              value={form.name}
              placeholder="Book Name"
              onChange={(e)=>{
                if(/^[A-Za-z0-9\s]*$/.test(e.target.value))
                  setForm({...form,name:e.target.value});
              }}
            />

            <input
              value={form.author}
              placeholder="Author"
              onChange={(e)=>{
                if(/^[A-Za-z\s]*$/.test(e.target.value))
                  setForm({...form,author:e.target.value});
              }}
            />

            <button className="search-btn" type="submit">Search</button>
          </form>

          {books.length === 0 && !error && (
            <p className="empty">No books searched yet</p>
          )}

          {books.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Serial</th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => (
                  <tr key={book._id}>
                    <td><input type="radio" name="selectBook" /></td>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.serialNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
}

export default Availability;
