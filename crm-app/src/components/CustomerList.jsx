import { useState } from "react";
import { deleteCustomer } from "../apiService/customer/apiCustomer";
import "./CustomerList.css";
import { Link } from "react-router-dom";

const CustomerList = ({ customers, handleGetCustomers, ...rest }) => {
  // const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  // const handleDetailsClick = (id) => {
  //   navigate(`/customers/${id}`);
  // };

  const handleDeleteClick = (id) => {
    deleteCustomer(id)
      .then((res) => {
        // console.log(res.data);
        if (res.data.deleted) {
          handleGetCustomers();
          setShowMore(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <table {...rest}>
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
                    <Link to={`/customers/edit/${row._id}`} className="edit">
                      Edytuj
                    </Link>
                    <Link to={`/customers/${row._id}`} className="details">
                      Pokaż szczegóły
                    </Link>
                    <button
                      onClick={() => {
                        handleDeleteClick(row._id);
                      }}
                      className="delete"
                    >
                      Usuń
                    </button>
                    <button
                      onClick={() => setShowMore(false)}
                      className="show-less"
                    >
                      Pokaż mniej
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowMore(true)}
                    className="show-more"
                  >
                    Pokaż więcej
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomerList;
