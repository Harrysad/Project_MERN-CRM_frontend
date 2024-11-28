import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

import {
  getCustomer,
  updateCustomer,
} from "../apiService/customer/apiCustomer";
import ActionList from "./ActionList";
import { addAction } from "../apiService/action/apiActions";
import { Button } from "react-bootstrap";
import ActionFormModal from "./modals/ActionFormModal";

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [newAction, setNewAction] = useState({
    type: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    getCustomer(id)
      .then((customer) => {
        setCustomer(customer);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleAction = (e) => {
    const { name, value } = e.target;
    setNewAction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    addAction(id, newAction)
      .then((res) => {
        updateCustomer((prev) => ({
          ...prev,
          actions: [...prev.actions, res.data],
        }));
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
          <ActionList actions={customer.actions} />
        ) : (
          <p>Brak akcji dla tego klienta</p>
        )}
      </div>

      <ActionFormModal
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        onChange={handleAction}
        value={newAction}
        onConfirm={handleSubmit}
      />
    </>
  );
}

export default CustomerDetails;
