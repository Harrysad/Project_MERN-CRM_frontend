import { Button } from "react-bootstrap";
import GenericModal from "./GenericModal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { FormControl } from "react-bootstrap";

const ActionFormModal = ({ show, onClose, onChange, value, onConfirm }) => {
  const title = `Dodawanie nowej akcji dla`;
  const body = (
    <>
    <FloatingLabel controlId="floatingInput" label="Typ akcji" className="mb-3">
        <FormControl
          type="text"
          name="type"
          value={value.type}
          onChange={onChange}
          placeholder="Typ akcji"
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Opis" className="mb-3">
      <FormControl
        type="text"
        name="description"
        value={value.description}
        onChange={onChange}
        placeholder="Typ akcji"
        required
      />
    </FloatingLabel>
    <FloatingLabel controlId="floatingInput" label="Data" className="mb-3">
      <FormControl
        type="date"
        name="date"
        value={value.date}
        onChange={onChange}
        placeholder="Data"
        required
      />
    </FloatingLabel>
    </>
  );
  const footer = (
    <>
      <Button variant="secondary" onClick={onClose}>
        Anuluj
      </Button>
      <Button variant="success" onClick={onConfirm}>
        Dodaj
      </Button>
    </>
  );

  return (
    <GenericModal 
        show={show} 
        onClose={onClose}
        title={title}
        body={body}
        footer={footer} />
  );
};

export default ActionFormModal;
