import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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
        <nav className="navbar navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Customers Relatioship Management
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasDarkNavbar"
              aria-controls="offcanvasDarkNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end text-bg-dark"
              tabIndex="-1"
              id="offcanvasDarkNavbar"
              aria-labelledby="offcanvasDarkNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                  Nav Menu
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">
                      Customer List
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/customers/add">
                      Add new customer
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
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
