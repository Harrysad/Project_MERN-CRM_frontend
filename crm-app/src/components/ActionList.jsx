import Table from "react-bootstrap/Table";
import { deleteAction, updateAction } from "../apiService/action/apiActions";
import { useEffect, useState } from "react";
import DeleteModal from "./modals/DeleteModal";
import ActionFormEditModal from "./modals/ActionFormEditModal";

const ActionList = ({ actions, onActionDelete, onEditAction }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [selectedActionId, setSelectedActionId] = useState();
  const [editAction, setEditAction] = useState({
    type: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (selectedActionId) {
      const actionToEdit = actions.find(
        (action) => action._id === selectedActionId
      );
      if (actionToEdit) {
        setEditAction({
          type: actionToEdit.type,
          description: actionToEdit.description,
          date: actionToEdit.date,
        });
      }
    }
  }, [selectedActionId, actions]);

  const handleDelete = () => {
    if (selectedActionId) {
      deleteAction(selectedActionId)
        .then((res) => {
          if (res.data) {
            setModalVisible(false);
            onActionDelete();
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setModalVisible(false);
          setSelectedActionId(false);
          onActionDelete();
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
        onEditAction();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setModalEditVisible(false);
        onEditAction();
      });
  };

  console.log(editAction);

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
          {actions.map((row, index) => {
            return (
              <tr key={row._id}>
                <td>{index + 1}</td>
                <td>{row.type}</td>
                <td>{row.description}</td>
                <td>{row.date}</td>
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

      <ActionFormEditModal
        show={modalEditVisible}
        onClose={() => setModalEditVisible(false)}
        onChange={handleEditChange}
        value={editAction}
        onConfirm={handleSubmit}
        actionId={selectedActionId}
      />
    </>
  );
};

export default ActionList;
