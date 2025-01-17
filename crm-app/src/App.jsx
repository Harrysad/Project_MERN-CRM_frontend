import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate, NavLink } from "react-router-dom";
import "./App.css";

import { getCustomers } from "./apiService/customer/apiCustomer";
import CustomerDetails from "./components/CustomerDetails";
import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";
import { SignUpSignIn } from "./components/SignUpSignIn";
import Pagination from "./components/Pagination";
import { deleteCookie, getCookie } from "./helpers/helpers";
import { Container, Nav, Navbar } from "react-bootstrap";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

const CUSTOMER_DATA_LIMIT = 7;

function App() {
  const [user, setUser] = useState(JSON.parse(getCookie("user") || "null"));
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      document.body.classList.add("logged-in");
    } else {
      document.body.classList.remove("logged-in");
    }
  }, [user]);

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
    if (user) {
      handleGetCustomers();
    }
  }, [user]);

  const handleLogOut = (e) => {
    e.preventDefault();

    setUser(null);
    deleteCookie("user");
    navigate("/Home");
  };

  const closeMenu = () => setExpanded(false);

  return (
    <>
      <div className="App">
        {user && (
          <Navbar expand="lg" expanded={expanded} bg="dark" variant="dark">
            <Container>
              <NavLink className="navbar-brand" to="/">
                Customers Relationship Management
              </NavLink>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                onClick={() => setExpanded(!expanded)}
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <NavLink to="/" className="nav-link text-dark mx-1" onClick={closeMenu}>
                    Home
                  </NavLink>
                  <NavLink to="/customers/add" className="nav-link text-dark mx-1" onClick={closeMenu}>
                    AddNew
                  </NavLink>
                  <a href="Home" className="nav-link text-dark mx-1" onClick={handleLogOut}>
                    Logout
                  </a>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
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
