// CustomerService.js
import axios from "axios";

// Base URL of your deployed backend
const BASE_URL = "https://customer-management-server-v1.onrender.com/api/customers";

// API endpoints
const getAllCustomersApi = `${BASE_URL}/all`;
const createCustomerApi = `${BASE_URL}/create`;
const getCustomerByIdApi = `${BASE_URL}/{id}`;
const updateCustomerApi = `${BASE_URL}/{id}`;
const deleteCustomerApi = `${BASE_URL}/{id}`;

// API functions
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

export const deleteCustomerById = (id) => {
  return axios.delete(deleteCustomerApi.replace("{id}", id));
};