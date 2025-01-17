import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/logs";

export const fetchProductSales = async (date) => {
  // date가 문자열이라면 Date 객체로 변환
  const formattedDate = new Date(date).toISOString().slice(0, 10).replace(/-/g, "");

  try {
    const response = await axios.get(`${API_URL}/product-sales?date=${formattedDate}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
