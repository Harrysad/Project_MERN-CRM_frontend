import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import { getCustomers } from "./apiService/customer/apiCustomer";
import CustomerDetails from "./components/CustomerDetails";
import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";
import { SignUpSignIn } from "./components/SignUpSignIn";
import axios from "axios";
import { logOutUser } from "./apiService/user/apiUser";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  axios.defaults.headers.common["Authorization"] = user?.jwt;

  // console.log(user.jwt)
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    handleGetCustomers();
  }, []);

  const handleGetCustomers = () => {
    getCustomers().then((customersList) => {
      setCustomers(customersList);
    });
  };

  const handleLogOut = () => {
    logOutUser()
    .then(() => {
      setUser(null)
      localStorage.removeItem("user")
    })
    .catch((err) => {
      console.error(err)
    })
  }

  return (
    <>
      <div className="App">
        {user && (
          <nav className="navbar navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                Customers Relationship Management
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
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="/"
                      >
                        Customer List
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/customers/add">
                        Add new customer
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/Home" onClick={handleLogOut}>
                        Log out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        )}
        <Routes>
          <Route path="/Home" element={<SignUpSignIn setUser={setUser} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <CustomerList
                  customers={customers}
                  handleGetCustomers={handleGetCustomers}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers/add"
            element={
              <ProtectedRoute user={user}>
                <CustomerForm getCustomers={handleGetCustomers} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers/edit/:id"
            element={
              <ProtectedRoute user={user}>
                <CustomerForm getCustomers={handleGetCustomers} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers/:id"
            element={
              <ProtectedRoute user={user}>
                <CustomerDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
