import axios from "axios";
import config from "../../config";

const api = axios.create({
    baseURL: config.api.url + '/home', // Podstawowy URL API
    headers: {
      "Content-Type": "application/json",
    },
  });

export const addUser = async (payload) => {
    try {
        const response = await api.post('/signup', payload)
        return response.data;
    } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      throw error;
    }
}