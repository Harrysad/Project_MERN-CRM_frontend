import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

import { getCustomer } from "../apiService/customer/apiCustomer";
import ActionList from "./ActionList";
import { addAction } from "../apiService/action/apiActions";
import { Button } from "react-bootstrap";
import ActionFormModal from "./modals/ActionFormModal";

import { formatNipCode, formatZipCode } from "../helpers/helpers";

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [newAction, setNewAction] = useState({
    type: "",
    description: "",
    date: "",
  });

  const getCustomerData = () => {
    getCustomer(id)
      .then((customer) => {
        const formattedAddress = {
          ...customer.address,
          postcode: formatZipCode(customer.address.postcode),
        };
        const formattedNip = formatNipCode(customer.nip);
        setCustomer({
          ...customer,
          address: formattedAddress,
          nip: formattedNip,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getCustomerData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    addAction({
      ...newAction,
      customer: id,
    })
      .then(() => {
        getCustomerData();
        setModalVisible(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
        <NavLink to="/" className="btn btn-secondary">
          Powrót do listy
        </NavLink>
        <Button
          onClick={() => {
            setModalVisible(true);
          }}
        >
          Dodaj nową akcję
        </Button>
        {customer?.actions?.length > 0 ? (
          <ActionList
            actions={customer.actions}
            onActionDelete={getCustomerData}
            onEditAction={getCustomerData}
            customerName={customer?.name}
          />
        ) : (
          <p>Brak akcji dla tego klienta</p>
        )}
      </div>

      <ActionFormModal
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        onChange={handleChange}
        value={newAction}
        onConfirm={handleSubmit}
        customerName={customer?.name}
      />
    </>
  );
}

export default CustomerDetails;
