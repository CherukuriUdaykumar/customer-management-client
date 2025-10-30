import React, { useEffect, useState } from 'react'
import { listCustomers } from '../services/CustomerService';
import { useNavigate } from 'react-router-dom';
import { deleteCustomerById } from '../services/CustomerService';


const ListCustomerComponent = () => {
   
    const [customers, setCustomer]= useState([]);

    const navigate = useNavigate();
    
    useEffect(() => {
       getAllCustomers();
    }, []);

    function getAllCustomers() {
         listCustomers().then((response) => {
            setCustomer(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }
  
    function addNewCustomer() {
        // Logic to add a new customer can be implemented here
        navigate('/add-customer');
    }
    
    function updateCustomer(id) {
    navigate(`/edit-customer/${id}`);
    }

    function deleteCustomer(id) {
        console.log("Delete customer with ID:", id);
        deleteCustomerById (id).then(() => {
            getAllCustomers();
        }).catch(error => {
            console.log(error);
        });
    }


return (
    <div className='container'>
        <h2 className="text-center">Customers List</h2>
        <button className='btn btn-primary mb-2' onClick={addNewCustomer}> Add Customer</button>
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                <th>Customer ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.firstName}</td>
                        <td>{customer.lastName}</td>
                        <td>{customer.email}</td>
                        <td>
                            <button className="btn btn-info" onClick={() => updateCustomer(customer.id) }>Update</button>
                            <button style={{marginLeft: "10px"}} className="btn btn-danger"onClick={() => deleteCustomer(customer.id) }>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}


export default ListCustomerComponent