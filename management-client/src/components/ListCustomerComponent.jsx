import React, { useEffect, useState } from 'react';
import { listCustomers, deleteCustomerById } from '../services/CustomerService';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import { toast } from 'react-toastify';

const ListCustomerComponent = () => {
  const [customers, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCustomers();
  }, []);

  function getAllCustomers() {
    setLoading(true);
    listCustomers()
      .then((response) => {
        setCustomer(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error loading customers");
        setLoading(false);
      });
  }

  function addNewCustomer() {
    navigate('/add-customer');
  }

  function updateCustomer(id) {
    navigate(`/edit-customer/${id}`);
  }

  function confirmDelete(id) {
    setSelectedId(id);
    setShowModal(true);
  }

  function handleDelete() {
    deleteCustomerById(selectedId)
      .then(() => {
        toast.success("Customer deleted");
        getAllCustomers();
        setShowModal(false);
      })
      .catch(() => toast.error("Error deleting customer"));
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg rounded">
        <div className="card-body">
          <h2 className="page-title">
            <i className="bi bi-people-fill me-2"></i>Customers List
          </h2>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary" onClick={addNewCustomer}>
              <i className="bi bi-person-plus-fill me-2"></i>Add Customer
            </button>
          </div>
          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>S.No</th>
                    <th>Customer ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={customer.id}>
                      <td>{index + 1}</td>
                      <td>{customer.id}</td>
                      <td>{customer.firstName}</td>
                      <td>{customer.lastName}</td>
                      <td>{customer.email}</td>
                      <td>
                        <button className="btn btn-info btn-sm me-2" onClick={() => updateCustomer(customer.id)}>
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => confirmDelete(customer.id)}>
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <ConfirmModal show={showModal} onClose={() => setShowModal(false)} onConfirm={handleDelete} />
    </div>
  );
};

export default ListCustomerComponent;