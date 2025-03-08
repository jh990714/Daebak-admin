// src/api/dashboard/index.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/logs";

export const refreshStatus = async () => {
  try {
    console.log(`${API_URL}/load?path=info`);
    const response = await axios.get(`${API_URL}/load?path=info`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
