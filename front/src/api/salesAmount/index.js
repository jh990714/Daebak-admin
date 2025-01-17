import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchSalesAmount = async (date) => {
  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
  try {
    const response = await axios.get(`${API_URL}/logs/sales-amount?date=${formattedDate}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch sales amount for ${formattedDate}`, error);
    return 0;
  }
};
