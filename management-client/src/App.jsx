import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListCustomerComponent from './components/ListCustomerComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerComponent from './components/CustomerComponent';


function App() {
  return (
  <>
    <BrowserRouter>
      <HeaderComponent />
      <div className="main-content">
        <Routes>
          {/* // Default route - http://localhost:3000 */}
          <Route path="/" element={<ListCustomerComponent />} />

          {/* // Route to list all customers - http://localhost:3000/customers/all */}
          <Route path="/customers/all" element={<ListCustomerComponent />} />

          {/* // Route to add a new customer - http://localhost:3000/add-customer */}
          <Route path="/add-customer" element={<CustomerComponent />} />
          
          {/* // Route to edit an existing customer - http://localhost:3000/edit-customer */}
          <Route path="/edit-customer/:id" element={<CustomerComponent />} />
        </Routes>
      </div>
      <FooterComponent />
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />
   </>
  );
}

export default App;