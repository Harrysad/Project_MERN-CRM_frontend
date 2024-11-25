import axios from "axios";
import config from "../../config";

// Utworzenie instancji Axios
const api = axios.create({
  baseURL: config.api.url + '/customers', // Podstawowy URL API
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCustomers = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
    throw error;
  }
};

export const getCustomer = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await api.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
    throw error;
  }
};

export const updateCustomer = async (id, payload) => {
  try {
    const response = await api.put(`/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
    throw error;
  }
};


export const addCustomer = async (payload) => {
    try {
      const response = await api.post(`/add`, payload);
      return response.data;
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
      throw error;
    }
  };
  