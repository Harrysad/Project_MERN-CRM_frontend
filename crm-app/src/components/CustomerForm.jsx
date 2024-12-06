import { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form, Button } from "react-bootstrap";

import {
  addCustomer,
  getCustomer,
  updateCustomer,
} from "../apiService/customer/apiCustomer";
import { FormControl } from "react-bootstrap";
import {
  extractCodeNumbers,
  formatNipCode,
  formatZipCode,
} from "../helpers/helpers";

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
          const formattedAddress = {
            ...customer.address,
            postcode: formatZipCode(customer.address.postcode),
          };
          const formattedNip = formatNipCode(customer.nip);
          setFormData({
            ...customer,
            address: formattedAddress,
            nip: formattedNip,
          });
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
      let newValue = value;

      if (addressKey === "postcode") {
        newValue = formatZipCode(value);
      }

      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressKey]: newValue,
        },
      }));
    } else if (name === "nip") {
      const formattedNip = formatNipCode(value);
      setFormData((prevState) => ({
        ...prevState,
        nip: formattedNip,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postcode = extractCodeNumbers(formData.address.postcode);
    const nip = extractCodeNumbers(formData.nip);
    const dataFormatted = {
      ...formData,
      address: {
        ...formData.address,
        postcode,
      },
      nip,
    };
    console.log("Kod pocztowy: ", postcode)
    console.log("Nip: ", nip)
    if (id) {
      updateCustomer(id, dataFormatted)
        .then(() => {
          navigate("/");
          getCustomers();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      addCustomer(dataFormatted)
        .then(() => {
          navigate("/");
          getCustomers();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Form className="formContainer" onSubmit={handleSubmit}>
      <h1>{id ? "Edytuj klienta" : "Dodaj nowego klienta"}</h1>
      <FloatingLabel
        controlId="floatingInput"
        label="Nazwa firmy"
        className="mb-3"
      >
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
      <FloatingLabel
        controlId="floatingInput"
        label="Nr. lokalu"
        className="mb-3"
      >
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

      <Button variant="success" type="submit">
        {id ? "Zapisz zmiany" : "Dodaj klienta"}
      </Button>
      <NavLink to="/" className="btn btn-danger">
        Anuluj
      </NavLink>
    </Form>
  );
};

export default CustomerForm;
