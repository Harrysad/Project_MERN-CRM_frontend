import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import {
  addCustomer,
  getCustomer,
  updateCustomer,
} from "../apiService/customer/apiCustomer";
import { FormControl } from "react-bootstrap";

const CustomerForm = ({ getCustomers }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: {
      street: "",
      suite: "",
      city: "",
      postcode: "",
    },
    nip: "",
  });

  useEffect(() => {
    if (id) {
      getCustomer(id)
        .then((customer) => {
          setFormData(customer);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressKey = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressKey]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateCustomer(id, formData)
        .then(() => {
          navigate("/");
          getCustomers();
          // window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      addCustomer(formData)
        .then(() => {
          navigate("/");
          getCustomers();
          // window.location.reload();
        })
        .catch((err) => {
          console.error("Tu jest błąd", err);
        });
    }
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <h1>{id ? "Edytuj klienta" : "Dodaj nowego klienta"}</h1>
      <FloatingLabel controlId="floatingInput" label="Nazwa firmy" className="mb-3">
        <FormControl
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nazwa firmy"
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Ulica" className="mb-3">
        <FormControl
          type="text"
          name="address.street"
          value={formData.address.street}
          onChange={handleChange}
          placeholder="Ulica"
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Nr. lokalu" className="mb-3">
        <FormControl
          type="text"
          name="address.suite"
          value={formData.address.suite}
          onChange={handleChange}
          placeholder="Nr. lokalu"
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Miasto" className="mb-3">
        <FormControl
          type="text"
          name="address.city"
          value={formData.address.city}
          onChange={handleChange}
          placeholder="Miasto"
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Kod pocztowy"
        className="mb-3"
      >
        <FormControl
          type="text"
          name="address.postcode"
          value={formData.address.postcode}
          onChange={handleChange}
          placeholder="Kod pocztowy"
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="NIP" className="mb-3">
        <FormControl
          type="text"
          name="nip"
          value={formData.nip}
          onChange={handleChange}
          placeholder="NIP"
          required
        />
      </FloatingLabel>

      <button type="submit">{id ? "Zapisz zmiany" : "Dodaj klienta"}</button>
    </form>
  );
};

export default CustomerForm;
