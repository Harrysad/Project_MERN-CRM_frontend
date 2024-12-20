import Table from "react-bootstrap/Table";
import {
  deleteAction,
  getActions,
  updateAction,
} from "../apiService/action/apiActions";
import { useEffect, useState } from "react";
import DeleteModal from "./modals/DeleteModal";
import ActionFormModal from "./modals/ActionFormModal";
import Pagination from "./Pagination";

const ACTION_DATA_LIMIT = 8;

const ActionList = ({
  actions,
  onActionDelete,
  onEditAction,
  customerName,
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

  const [allActions, setAllActions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalActions, setTotalActions] = useState(0);

  const customerId = actions.length > 0 ? actions[0].customer : null;

  const handleGetActions = (page = currentPage, limit = ACTION_DATA_LIMIT) => {
    getActions(customerId, page, limit).then((res) => {
      setAllActions(res?.data);
      setTotalActions(res?.totalActions);
      setCurrentPage(res?.page);
    });
  };

  useEffect(() => {
    if (customerId) {
      handleGetActions(currentPage, ACTION_DATA_LIMIT);
    }
  }, [customerId, currentPage]);

  useEffect(() => {
    if (selectedActionId) {
      const actionToEdit = actions.find(
        (action) => action._id === selectedActionId
      );
      if (actionToEdit) {
        setEditAction(actionToEdit);
      }
    }
  }, [selectedActionId, actions]);

  const handleDelete = () => {
    if (selectedActionId) {
      deleteAction(selectedActionId)
        .then((res) => {
          if (res.data) {
            console.log(res.data);
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
      />
      <Pagination
        dataPerPage={ACTION_DATA_LIMIT}
        totalData={totalActions}
        currentPage={currentPage}
        paginate={(page) => handleGetActions(page)}
      />
    </>
  );
};

export default ActionList;
