import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";

import { getCustomers } from "./apiService/customer/apiCustomer";
import CustomerDetails from "./components/CustomerDetails";
import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";

function App() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    handleGetCustomers();
  }, []);

  const handleGetCustomers = () => {
    getCustomers().then((customersList) => {
      setCustomers(customersList);
    });
  };

  return (
    <>
      <div className="App">
        <div className="navContainer">
            <Link to="/" className="navText">
              Lista klientów
            </Link>
            <Link to="/customers/add" className="navText">
              Dodaj klienta
            </Link>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <CustomerList
                customers={customers}
                handleGetCustomers={handleGetCustomers}
              />
            }
          />
          <Route
            path="/customers/add"
            element={<CustomerForm getCustomers={handleGetCustomers} />}
          />
          <Route
            path="/customers/edit/:id"
            element={<CustomerForm getCustomers={handleGetCustomers} />}
          />
          <Route path="/customers/:id" element={<CustomerDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
