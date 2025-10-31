import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCustomer, getCustomerById, updateCustomer } from '../services/CustomerService';
import { toast } from 'react-toastify';

const CustomerComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  const [errors, setErrors] = useState({ firstName: "", lastName: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getCustomerById(id)
        .then((response) => {
          const customer = response.data;
          setFirstName(customer.firstName);
          setLastName(customer.lastName);
          setEmail(customer.email);
        })
        .catch(() => toast.error("Error fetching customer details"));
    }
  }, [id]);

  const saveOrUpdateCustomer = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const customer = { firstName, lastName, email };
      if (id) {
        updateCustomer(id, customer)
          .then(() => {
            toast.success("Customer updated successfully");
            navigate('/customers/all');
          })
          .catch(() => toast.error("Error updating customer"));
      } else {
        createCustomer(customer)
          .then(() => {
            toast.success("Customer added successfully");
            navigate('/customers/all');
          })
          .catch(() => toast.error("Error adding customer"));
      }
    }
  };

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName.trim()) {
      errorsCopy.firstName = "First Name is required";
      valid = false;
    } else if (!nameRegex.test(firstName)) {
      errorsCopy.firstName = "Only letters allowed";
      valid = false;
    } else {
      errorsCopy.firstName = "";
    }

    if (!lastName.trim()) {
      errorsCopy.lastName = "Last Name is required";
      valid = false;
    } else if (!nameRegex.test(lastName)) {
      errorsCopy.lastName = "Only letters allowed";
      valid = false;
    } else {
      errorsCopy.lastName = "";
    }

    if (!email.trim()) {
      errorsCopy.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      errorsCopy.email = "Enter a valid email address";
      valid = false;
    } else {
      errorsCopy.email = "";
    }

    setErrors(errorsCopy);
    return valid;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow rounded">
            <div className="card-body">
              <h2 className="page-title">
                <i className="bi bi-pencil-square me-2"></i>{id ? "Update Customer" : "Add Customer"}
              </h2>
              <form>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    id="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label htmlFor="firstName">First Name</label>
                  {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label htmlFor="lastName">Last Name</label>
                  {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email">Email</label>
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <button className="btn btn-success w-100 btn-lg" onClick={saveOrUpdateCustomer}>
                  <i className="bi bi-check-circle me-2"></i>Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CustomerComponent;