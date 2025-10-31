import axios from "axios";

const BASE_URL = "https://customer-management-server-v1.onrender.com/api/customers";

const getAllCustomersApi = `${BASE_URL}/all`;
const createCustomerApi = `${BASE_URL}/create`;
const getCustomerByIdApi = `${BASE_URL}/{id}`;
const updateCustomerApi = `${BASE_URL}/{id}`;
const deleteCustomerApi = `${BASE_URL}/{id}`;

export const listCustomers = () => axios.get(getAllCustomersApi);

export const createCustomer = async (customer) => {
  try {
    const response = await axios.post(createCustomerApi, customer, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      throw new Error("Email already exists");
    }
    throw error;
  }
};

export const getCustomerById = (id) => axios.get(getCustomerByIdApi.replace("{id}", id));

export const updateCustomer = (id, customer) =>
  axios.put(updateCustomerApi.replace("{id}", id), customer, {
    headers: { 'Content-Type': 'application/json' }
  });

export const deleteCustomerById = (id) => axios.delete(deleteCustomerApi.replace("{id}", id));