import Table from "react-bootstrap/Table";
import {
  deleteAction,
  updateAction,
} from "../apiService/action/apiActions";
import { useEffect, useState } from "react";
import DeleteModal from "./modals/DeleteModal";
import ActionFormModal from "./modals/ActionFormModal";
// import { useParams } from "react-router-dom";

const ActionList = ({
  handleGetActions,
  customerName,
  allActions,
  // currentPage,
  // dataPerPage
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [selectedActionId, setSelectedActionId] = useState(null);
  const [editAction, setEditAction] = useState({
    _id: "",
    type: "",
    description: "",
    date: "",
    customer: "",
  });

  // const customerId = useParams().id

  // useEffect(() => {
  //   if (customerId) {
  //     handleGetActions(currentPage, dataPerPage);
  //   }
  // }, [customerId, currentPage]);

  useEffect(() => {
    if (selectedActionId) {
      const actionToEdit = allActions.find(
        (action) => action._id === selectedActionId
      );
      if (actionToEdit) {
        setEditAction(actionToEdit);
      }
    }
  }, [selectedActionId, allActions]);

  const handleDelete = () => {
    if (selectedActionId) {
      deleteAction(selectedActionId)
        .then((res) => {
          if (res.deleted) {
            console.log(res.deleted);
            setModalVisible(false);
            handleGetActions(); //Tu powinienem przekazać funkcję do odświeżenia listy akcji
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditAction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    updateAction(selectedActionId, editAction)
      .then(() => {
        setModalEditVisible(false);
        handleGetActions();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Wydarzenie</th>
            <th>Opis</th>
            <th>Data</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {allActions.map((row, index) => {
            return (
              <tr key={row._id}>
                <td>{index + 1}</td>
                <td>{row.type}</td>
                <td>{row.description}</td>
                <td>{row.date.slice(0, 10)}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedActionId(row._id);
                      setModalEditVisible(true);
                    }}
                    className="btn btn-secondary"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => {
                      setSelectedActionId(row._id);
                      setModalVisible(true);
                    }}
                    className="btn btn-danger"
                  >
                    Usuń
                  </button>
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

      <ActionFormModal
        show={modalEditVisible}
        onClose={() => setModalEditVisible(false)}
        handleChange={handleEditChange}
        value={editAction}
        onConfirm={handleSubmit}
        customerName={customerName}
        formMode="edit"
        handleGetActions={handleGetActions}
      />
    </>
  );
};

export default ActionList;
