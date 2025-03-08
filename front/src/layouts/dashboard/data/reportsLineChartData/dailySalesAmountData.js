import { fetchSalesAmount } from "api/salesAmount";

const dailySalesAmountData = async (startDate, endDate) => {
  try {
    // 문자열을 Date 객체로 변환
    const start = new Date(startDate);
    const end = new Date(endDate);

    const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    // 판매 수익 데이터 가져오기
    const counts = await Promise.all(
      Array.from({ length: daysDiff + 1 }, (_, i) => {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        return fetchSalesAmount(date);
      })
    );

    // 날짜 라벨 생성
    const labels = Array.from({ length: daysDiff + 1 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return `${date.getMonth() + 1}.${date.getDate()}`; // 날짜 포맷 변경
    });

    return {
      labels: labels,
      datasets: { label: "판매 수익", data: counts },
    };
  } catch (error) {
    console.error("Failed to fetch sales amounts for the specified date range", error);
    return {
      labels: [],
      datasets: { label: "판매 수익", data: [] },
    };
  }
};

export default dailySalesAmountData;
