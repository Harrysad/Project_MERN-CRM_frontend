import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate, Link } from "react-router-dom";
import "./App.css";

import { getCustomers } from "./apiService/customer/apiCustomer";
import CustomerDetails from "./components/CustomerDetails";
import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";
import { SignUpSignIn } from "./components/SignUpSignIn";
import axios from "axios";
import Pagination from "./components/Pagination";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

const CUSTOMER_DATA_LIMIT = 10;

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      document.body.classList.add("logged-in");
    } else {
      document.body.classList.remove("logged-in");
    }
  }, [user]);

  axios.defaults.headers.common["Authorization"] = user?.jwt;

  // console.log(user.jwt)
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCustomers, setTotalCustomers] = useState(0);

  const handleGetCustomers = (
    page = currentPage,
    limit = CUSTOMER_DATA_LIMIT
  ) => {
    getCustomers(page, limit).then((res) => {
      setCustomers(res.data);
      setTotalCustomers(res.total);
      setCurrentPage(res.page);
    });
  };

  useEffect(() => {
    handleGetCustomers();
  }, []);

  const handleLogOut = (e) => {
    e.preventDefault();

    setUser(null);
    localStorage.removeItem("user");
    navigate("/Home");
  };

  return (
    <>
      <div className="App">
        {user && (
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                Customers Relationship Management
              </Link>
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
                      <Link
                        className="nav-link"
                        to="/"
                        onClick={() => {
                          document.body.style = "";
                          document.nav.style = "";
                        }}
                      >
                        Customer List
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/customers/add"
                        onClick={() => {
                          document.body.style = "";
                          document.nav.style = "";
                        }}
                      >
                        Add new customer
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/Home"
                        onClick={handleLogOut}
                      >
                        Log out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        )}
        <div className="main-content">
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
                  <Pagination
                    dataPerPage={CUSTOMER_DATA_LIMIT}
                    totalData={totalCustomers}
                    currentPage={currentPage}
                    paginate={(page) => handleGetCustomers(page)}
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
      </div>
    </>
  );
}

export default App;
