import './App.css'
import axios from "axios";
import config from './config';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import CustomerDetails from './components/CustomerDetails';

function App() {
  const [customers, setCustomers] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    axios
      .get(config.api.url + '')
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.error(err)
      })
  };

  const deleteCustomer = (rowId) => {
    if (window.confirm("Czy na pewno chcesz usunąć klienta z bazy dancyh?")) {
      // console.log(rowId);
      axios
        .delete(config.api.url + '/delete/' + rowId)
        .then((res) => {
          // console.log(res.data);
          if (res.data.deleted) {
            getCustomers();
            setShowMore(false);
          }
        })
        .catch((err) => {
          console.error(err);
        })
    }
  };

  return (
    <>
      <div className="App">
        <div className="navContainer">
          <nav>
            <Link to="/" className="navText">Lista klientów</Link>
            <Link to="/customers/add" className="navText">Dodaj klienta</Link>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<CustomerList
            customers={customers}
            deleteCustomer={deleteCustomer}
            showMore={showMore}
            setShowMore={setShowMore}
          />} />
          <Route path="/customers/add" element={<CustomerForm 
              getCustomers={getCustomers}/>} />
          <Route path="/customers/edit/:id" element={<CustomerForm 
              getCustomers={getCustomers}/>} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
        </Routes>
      </div >
    </>
  )
}

export default App;
