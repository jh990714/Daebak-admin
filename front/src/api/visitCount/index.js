import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchVisitCount = async (date) => {
  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
  try {
    const response = await axios.get(`${API_URL}/api/logs/visit-count?date=${formattedDate}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch visit count for ${formattedDate}`, error);
    return 0;
  }
};
