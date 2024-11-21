import './App.css'
import axios from "axios";
import config from './config';
import React, { useEffect, useState } from 'react';

import CustomerList from './components/CustomerList';

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
      console.log(rowId);
      axios
        .delete(config.api.url + '/delete/' + rowId)
        .then((res) => {
          console.log(res.data);
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
        <CustomerList 
          customers={customers} 
          deleteCustomer={deleteCustomer} 
          showMore={showMore}
          setShowMore={setShowMore}
          />
      </div>
    </>
  )
}

export default App;
