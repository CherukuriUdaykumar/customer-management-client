import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer, getCustomerById, updateCustomer } from '../services/CustomerService';
import { useParams} from "react-router-dom"; 


const CustomerComponent = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { id } = useParams();
  const[errors, setErrors] =useState({
    firstName: "",
    lastName: "",
    email: ""
  })

  const navigate = useNavigate();

  useEffect(() => {
    // If id is present, fetch customer details and populate the form for editing
    if (id) { 
        getCustomerById(id).then((response) => {
            const customer = response.data;
            setFirstName(customer.firstName);
            setLastName(customer.lastName);
            setEmail(customer.email);
        }).catch((error) => {
            console.log("Error fetching customer details", error);
        });
    }
    }, [id]);

  const saveOrUpdateCustomer = (e) => {
    e.preventDefault();
    if (validateForm()) {
        const customer = { firstName, lastName, email };
        console.log(customer);
        if (id) {
            updateCustomer(id, customer)
            .then((response) => {
                console.log("Customer updated successfully", response.data);
                navigate('/customers/all');
            })
            .catch((error) => {
                console.log("Error updating customer", error);
            })}
        else {
        createCustomer(customer)
      .then((response) => {
        console.log("Customer added successfully", response.data);
        navigate('/customers/all');
      })
      .catch((error) => {
        console.log("Error adding customer", error);
      })}
    }
  };

  function validateForm() {
    let valid = true;
   const errorsCopy= {...errors};
    if (firstName.trim()) {
        errorsCopy.firstName = "";
    }
    else {
        errorsCopy.firstName = "First Name is required";
        valid = false;
    }
    if (lastName.trim()) {
        errorsCopy.lastName = "";
    }
    else {
        errorsCopy.lastName = "Last Name is required";
        valid = false;
    }
    if (email.trim()) {
        errorsCopy.email = "";
    }
    else {
        errorsCopy.email = "Email is required";
        valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

function pageTitle() {
    if (id) {
        return <h2 className="text-center">Update Customer</h2>
    }else {
        return <h2 className="text-center">Add Customer</h2>
    }
  }

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
            {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <button className="btn btn-success" onClick={saveOrUpdateCustomer}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerComponent;