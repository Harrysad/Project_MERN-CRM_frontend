import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getCustomer } from "../apiService/customer/apiCustomer";

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  console.log(customer)

  useEffect(() => {
    getCustomer(id)
      .then((customer) => {
        setCustomer(customer);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <>
      <div className="detailsContainer">
        <h1>{customer?.name}</h1>
        <p>
          Ulica: {customer?.address?.street} {customer?.address?.suite}
        </p>
        <p>Kod pocztowy: {customer?.address?.postcode}</p>
        <p>Miasto: {customer?.address?.city}</p>
        <p>NIP: {customer?.nip}</p>
        <Link to="/">Powrót do listy</Link>
      </div>
    </>
  );
}

export default CustomerDetails;
