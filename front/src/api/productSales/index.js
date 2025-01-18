import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/logs";

export const fetchProductSales = async ({ startDate, endDate }) => {
  // 날짜가 문자열이면 Date 객체로 변환
  const formattedStartDate = startDate.replace("-", "");
  const formattedEndDate = endDate.replace("-", "");
  console.log(formattedStartDate);
  try {
    const response = await axios.get(`
      ${API_URL}/product-sales?startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
