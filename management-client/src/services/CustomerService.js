// CustomerService.js
import axios from "axios";

const getAllCustomersApi = "http://localhost:8080/api/customers/all";
const createCustomerApi = "http://localhost:8080/api/customers/create";
const getCustomerByIdApi = "http://localhost:8080/api/customers/{id}";
const updateCustomerApi = "http://localhost:8080/api/customers/{id}";
const deleteCustomerApi = "http://localhost:8080/api/customers/{id}";

export const listCustomers = () => {
  return axios.get(getAllCustomersApi);
};

export const createCustomer = (customer) => {
  return axios.post(createCustomerApi, customer, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const getCustomerById = (id) => {
  return axios.get(getCustomerByIdApi.replace("{id}", id));
};

export const updateCustomer = (id, customer) => {
  return axios.put(updateCustomerApi.replace("{id}", id), customer, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const deleteCustomerById  = (id) => {
  return axios.delete(deleteCustomerApi.replace("{id}", id));
};
