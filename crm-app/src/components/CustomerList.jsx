import { useState } from "react";
import { deleteCustomer } from "../apiService/customer/apiCustomer";
import { NavLink } from "react-router-dom";
import DeleteClientModal from "./modals/DeleteClientModal";
import Table from "react-bootstrap/Table";

const CustomerList = ({ customers, handleGetCustomers }) => {
  const [showMore, setShowMore] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState();

  const handleDelete = () => {
    if (selectedCustomerId) {
      deleteCustomer(selectedCustomerId)
        .then((res) => {
          if (res.data.deleted) {
            handleGetCustomers();
            setShowMore(false);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setModalVisible(false);
          setSelectedCustomerId(false);
        });
    }
  };

  return (
    <>
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
                  {row.address.postcode.slice(0, 2)}-
                  {row.address.postcode.slice(2)} {row.address.city}
                  <br />
                  {row.address.street} {row.address.suite}
                </td>
                <td>{row.nip}</td>
                <td>
                  {showMore ? (
                    <>
                      <NavLink to={`/customers/edit/${row._id}`} className="btn btn-primary">
                        Edytuj
                      </NavLink>
                      <NavLink to={`/customers/${row._id}`} className="btn btn-info">
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

      <DeleteClientModal
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default CustomerList;
