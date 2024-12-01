import Table from "react-bootstrap/Table";
import { deleteAction } from "../apiService/action/apiActions";
import { useState } from "react";
import DeleteModal from "./modals/DeleteModal";

const ActionList = ({ actions, onActionDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedActionId, setSelectedActionId] = useState();

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
                      console.log("Próba edycji");
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
    </>
  );
};

export default ActionList;
