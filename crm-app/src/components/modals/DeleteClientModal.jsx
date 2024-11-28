import { Button } from "react-bootstrap";
import GenericModal from "./GenericModal";

const DeleteClientModal = ({ show, onClose, onConfirm }) => {
  const title = "Potwierdzenie usunięcia";
  const body = "Czy na pewno chcesz usunąc tego klienta";
  const footer = (
    <>
      <Button variant="secondary" onClick={onClose}>
        Anuluj
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        Usuń
      </Button>
    </>
  );

  return (
    <GenericModal
      show={show}
      onClose={onClose}
      title={title}
      body={body}
      footer={footer}
    />
  );
};

export default DeleteClientModal;
