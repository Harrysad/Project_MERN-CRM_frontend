import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../config';

const CustomerForm = ({getCustomers}) => {
    const [formData, setFormData] = useState({
        name: '',
        address: {
            street: '',
            suite: '',
            city: '',
            postcode: ''
        },
        nip: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios
                .get(config.api.url + `/${id}`)
                .then((res) => {
                    setFormData(res.data);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('address.')) {
            const addressKey = name.split('.')[1];
            setFormData(prevState => ({
                ...prevState, address: {
                    ...prevState.address,
                    [addressKey]: value
                }
            }))
        } else {
            setFormData({...formData, [name]: value});
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            axios
            .put(config.api.url + `/edit/${id}`, formData)
            .then(() => {
                navigate('/');
                getCustomers();
                // window.location.reload();
            })
            .catch((err) => {
                console.error(err);
            })
        } else {
            axios
            .post(config.api.url + '/add', formData)
            .then(() => {
                navigate('/');
                getCustomers();
                // window.location.reload();
            })
            .catch((err) => {
                console.error("Tu jest błąd", err);
            })
        }
    };

    return (
        <form className='formContainer' onSubmit={handleSubmit}>
            <h1>{id ? 'Edytuj klienta' : 'Dodaj nowego klienta'}</h1>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Nazwa firmy' required/>
            <input type="text" name="address.street" value={formData.address.street} onChange={handleChange} placeholder="Ulica" required/>
            <input type="text" name="address.suite" value={formData.address.suite} onChange={handleChange} placeholder="Nr. lokalu" required/>
            <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} placeholder="Miasto" required/>
            <input type="text" name="address.postcode" value={formData.address.postcode} onChange={handleChange} placeholder="Kod pocztowy" required/>
            <input type="text" name="nip" value={formData.nip} onChange={handleChange} placeholder="NIP" required/>
            <button type="submit">{id ? 'Zapisz zmiany' : 'Dodaj klienta'}</button>
        </form>
    );
}

export default CustomerForm;