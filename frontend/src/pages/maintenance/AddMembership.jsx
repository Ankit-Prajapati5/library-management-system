import { useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import "../../css/AddMembership.css";

// allow only alphabets
const handleNameChange = (value, field, form, setForm) => {
  if (/^[A-Za-z\s]*$/.test(value)) {
    setForm({ ...form, [field]: value });
  }
};

// allow only numbers with max length
const handleNumberChange = (value, field, max, form, setForm) => {
  if (/^\d*$/.test(value) && value.length <= max) {
    setForm({ ...form, [field]: value });
  }
};

const validate = (form) => {
  const errors = {};

  // Name validation
  if (!/^[A-Za-z]{2,}$/.test(form.firstName))
    errors.firstName = "Enter valid first name (letters only, min 2)";

  if (!/^[A-Za-z]{2,}$/.test(form.lastName))
    errors.lastName = "Enter valid last name";

  // Contact
  if (!/^[0-9]{10}$/.test(form.contactNo))
    errors.contactNo = "Contact must be 10 digits";

  // Aadhaar
  if (!/^[0-9]{12}$/.test(form.aadhaarNo))
    errors.aadhaarNo = "Aadhaar must be 12 digits";

  // Address
  if (form.address.trim().length < 5) errors.address = "Address too short";

  // Date (no future date)
  if (new Date(form.startDate) > new Date())
    errors.startDate = "Future date not allowed";

  return errors;
};

function AddMembership() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    address: "",
    aadhaarNo: "",
    startDate: "",
    membershipType: "6months",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await API.post("/membership/add", form);
      setSuccess(true);
      setMessage("Membership added successfully");
    } catch (err) {
      setSuccess(false);
      setMessage(err.response?.data?.message || "Error");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="membership-page">
        <div className="membership-card">
          <h3 className="membership-title">Add Membership</h3>

          {message && (
            <p className={`message ${success ? "success" : "error"}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                required
                value={form.firstName}
                placeholder="First Name"
                onChange={(e) =>
                  handleNameChange(e.target.value, "firstName", form, setForm)
                }
              />

              {errors.firstName && <p className="error">{errors.firstName}</p>}
              <input
                required
                value={form.lastName}
                placeholder="Last Name"
                onChange={(e) =>
                  handleNameChange(e.target.value, "lastName", form, setForm)
                }
              />

              {errors.lastName && <p className="error">{errors.lastName}</p>}

              <input
                required
                value={form.contactNo}
                placeholder="Contact No"
                onChange={(e) =>
                  handleNumberChange(
                    e.target.value,
                    "contactNo",
                    10,
                    form,
                    setForm,
                  )
                }
              />

              {errors.contactNo && <p className="error">{errors.contactNo}</p>}

              <input
                required
                className="full"
                placeholder="Address"
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              {errors.address && <p className="error">{errors.address}</p>}

              <input
                required
                value={form.aadhaarNo}
                placeholder="Aadhaar No"
                onChange={(e) =>
                  handleNumberChange(
                    e.target.value,
                    "aadhaarNo",
                    12,
                    form,
                    setForm,
                  )
                }
              />

              {errors.aadhaarNo && <p className="error">{errors.aadhaarNo}</p>}

              <input
                type="date"
                required
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
              />
              {errors.startDate && <p className="error">{errors.startDate}</p>}
            </div>

            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  checked={form.membershipType === "6months"}
                  onChange={() =>
                    setForm({ ...form, membershipType: "6months" })
                  }
                />
                6 Months
              </label>

              <label>
                <input
                  type="radio"
                  checked={form.membershipType === "1year"}
                  onChange={() => setForm({ ...form, membershipType: "1year" })}
                />
                1 Year
              </label>

              <label>
                <input
                  type="radio"
                  checked={form.membershipType === "2years"}
                  onChange={() =>
                    setForm({ ...form, membershipType: "2years" })
                  }
                />
                2 Years
              </label>
            </div>

            <button className="submit-btn" type="submit">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMembership;
