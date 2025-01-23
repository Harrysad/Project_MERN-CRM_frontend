import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getCustomer } from "../apiService/customer/apiCustomer";
import ActionList from "./ActionList";
import { addAction } from "../apiService/action/apiActions";
import { Button } from "react-bootstrap";
import ActionFormModal from "./modals/ActionFormModal";
import Pagination from "./Pagination";
import { getActions } from "../apiService/action/apiActions";
import { formatNipCode, formatZipCode } from "../helpers/helpers";

const ACTION_INIT_FORM_DATA = {
  type: "",
  description: "",
  date: "",
};

const ACTION_DATA_LIMIT = 4;

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [newAction, setNewAction] = useState(ACTION_INIT_FORM_DATA);

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

  const [allActions, setAllActions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalActions, setTotalActions] = useState(0);

  const handleGetActions = (page = currentPage, limit = ACTION_DATA_LIMIT) => {
    getActions(id, page, limit).then((res) => {
      setAllActions(res?.data);
      setTotalActions(res?.totalActions);
      setCurrentPage(res?.page);
    });
  };

  useEffect(() => {
    getCustomerData();
    if (id) {
      handleGetActions(currentPage, ACTION_DATA_LIMIT);
    }
  }, [id, ACTION_DATA_LIMIT]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => setNewAction(ACTION_INIT_FORM_DATA);

  const handleSubmit = () => {
    addAction({
      ...newAction,
      customer: id,
    })
      .then(() => {
        // console.log("Action added");
        // console.log(newAction);
        handleGetActions();
        setModalVisible(false);
        resetForm();
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
        <Link to="/" className="btn btn-secondary">
          Powrót do listy
        </Link>
        <Button
          onClick={() => {
            setModalVisible(true);
          }}
        >
          Dodaj nową akcję
        </Button>

        <ActionList
          handleGetActions={handleGetActions}
          customerName={customer?.name}
          allActions={allActions}
          currentPage={currentPage}
          dataPerPage={ACTION_DATA_LIMIT}
        />

        <Pagination
        dataPerPage={ACTION_DATA_LIMIT}
        totalData={totalActions}
        currentPage={currentPage}
        paginate={(page) => handleGetActions(page)}
      />
      </div>

      <ActionFormModal
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        handleChange={handleChange}
        value={newAction}
        onConfirm={handleSubmit}
        customerName={customer?.name}
      />
    </>
  );
}

export default CustomerDetails;
