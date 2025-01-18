import { fetchSalesCount } from "api/salesCount";

const dailySalesCountData = async (startDate, endDate) => {
  try {
    // 문자열을 Date 객체로 변환
    const start = new Date(startDate);
    const end = new Date(endDate);

    const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    // 판매량 데이터 가져오기
    const counts = await Promise.all(
      Array.from({ length: daysDiff + 1 }, (_, i) => {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        return fetchSalesCount(date);
      })
    );

    // 날짜 라벨 생성
    const labels = Array.from({ length: daysDiff + 1 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return `${date.getMonth() + 1}.${date.getDate()}`;
    });

    return {
      labels: labels,
      datasets: { label: "판매량", data: counts },
    };
  } catch (error) {
    console.error("Failed to fetch sales counts for the specified date range", error);
    return {
      labels: [],
      datasets: { label: "판매량", data: [] },
    };
  }
};

export default dailySalesCountData;
