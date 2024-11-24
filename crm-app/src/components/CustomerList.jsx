import './CustomerList.css'
import React from 'react';
import { useNavigate } from "react-router-dom";

const CustomerList = ({ customers, deleteCustomer, showMore, setShowMore, ...rest }) => {
    const navigate = useNavigate();

    const handleEditClick = (id) => {
        navigate(`/customers/edit/${id}`);
    };

    const handleDetailsClick = (id) => {
      navigate(`/customers/${id}`);  
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
                                {row.address.postcode.slice(0, 2)}-{row.address.postcode.slice(2)}{" "}
                                {row.address.city}<br />
                                {row.address.street}{" "}
                                {row.address.suite}
                            </td>
                            <td>{row.nip}</td>
                            <td>
                                {
                                    showMore ? (
                                        <>
                                            <button onClick={() => handleEditClick(row._id)}
                                                className='edit'>Edytuj</button>
                                            <button onClick={() => handleDetailsClick(row._id)}
                                                className='details'>Pokaż szczegóły</button>
                                            <button onClick={() => {
                                                deleteCustomer(row._id);
                                            }}
                                                className='delete'>Usuń</button>
                                            <button onClick={() => setShowMore(false)}
                                                className='show-less'>Pokaż mniej</button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => setShowMore(true)}
                                            className='show-more'>Pokaż więcej</button>
                                    )
                                }
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default CustomerList;