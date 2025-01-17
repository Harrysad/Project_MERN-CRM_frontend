import { useState } from "react";
import { deleteCustomer } from "../apiService/customer/apiCustomer";
import { NavLink } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { formatZipCode, formatNipCode } from "../helpers/helpers";
import DeleteModal from "./modals/DeleteModal";

const CustomerList = ({ customers, handleGetCustomers }) => {
  const [showMore, setShowMore] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState();

  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortChange = (e) => {
    setSortField(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleDelete = () => {
    if (selectedCustomerId) {
      deleteCustomer(selectedCustomerId)
        .then((res) => {
          if (res.deleted) {
            handleGetCustomers();
            setShowMore(false);
            setModalVisible(false);
            setSelectedCustomerId(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
    <div className="d-flex justify-content-between align-items-center">
        <div className="sortSection">
          <label htmlFor="sortSelect">
            Sortuj według:
          </label>
          <select
            id="sortSelect"
            className="form-select"
            style={{ width: "200px", display: "inline-block" }}
            value={sortField}
            onChange={handleSortChange}
          >
            <option value="name">Nazwa firmy</option>
            <option value="address.postcode">Kod pocztowy</option>
            <option value="nip">NIP</option>
          </select>
        </div>
        <button className="btn btn-secondary" onClick={toggleSortOrder}>
          {sortOrder === "asc" ? "Sortuj malejąco" : "Sortuj rosnąco"}
        </button>
      </div>
      
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Nazwa firmy</th>
            <th>Adres</th>
            <th>NIP</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((row, index) => {
            return (
              <tr key={row._id}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>
                  {formatZipCode(row.address.postcode)} {row.address.city}
                  <br />
                  {row.address.street} {row.address.suite}
                </td>
                <td>{formatNipCode(row.nip)}</td>
                <td>
                  {showMore ? (
                    <>
                      <NavLink
                        to={`/customers/edit/${row._id}`}
                        className="btn btn-primary"
                      >
                        Edytuj
                      </NavLink>
                      <NavLink
                        to={`/customers/${row._id}`}
                        className="btn btn-info"
                      >
                        Pokaż szczegóły
                      </NavLink>
                      <button
                        onClick={() => {
                          setSelectedCustomerId(row._id);
                          setModalVisible(true);
                        }}
                        className="btn btn-danger"
                      >
                        Usuń
                      </button>
                      <button
                        onClick={() => setShowMore(false)}
                        className="btn btn-secondary"
                      >
                        Pokaż mniej
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setShowMore(true)}
                      className="btn btn-secondary"
                    >
                      Pokaż więcej
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <DeleteModal
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default CustomerList;
