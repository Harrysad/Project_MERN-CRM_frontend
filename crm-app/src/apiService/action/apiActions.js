import axios from "axios";
import config from "../../config";

const api = axios.create({
  baseURL: config.api.url + "/actions",
  headers: {
    "Content-Type": "application/json",
    Authorization: JSON.parse(localStorage.getItem("user"))?.jwt,
  },
});

export const getActions = async (payload) => {
  try {
    const response = await api.get("/index", payload);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania danych: ", error);
    throw error;
  }
};

export const addAction = async (payload) => {
  try {
    const response = await api.post("/add", payload);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania danych: ", error);
    throw error;
  }
};

export const updateAction = async (id, payload) => {
  try {
    const response = await api.put(`/edit/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania danych: ", error);
    throw error;
  }
};

export const deleteAction = async (id) => {
  try {
    const response = await api.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania danych: ", error);
    throw error;
  }
};
