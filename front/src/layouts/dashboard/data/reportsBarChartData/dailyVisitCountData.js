import { fetchVisitCount } from "api/visitCount";
import React, { useEffect, useState } from "react";

const dailyVisitCountData = async (startDate, endDate) => {
  console.log(startDate, endDate);

  // 문자열을 Date 객체로 변환
  const start = new Date(startDate);
  const end = new Date(endDate);

  try {
    const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    console.log(daysDiff);

    const counts = await Promise.all(
      Array.from({ length: daysDiff + 1 }, (_, i) => {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        return fetchVisitCount(date);
      })
    );

    const labels = Array.from({ length: daysDiff + 1 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return `${date.getMonth() + 1}.${date.getDate()}`;
    });

    return {
      labels: labels,
      datasets: { label: "방문자", data: counts },
    };
  } catch (error) {
    console.error("Failed to fetch visit counts for the specified date range", error);
    return {
      labels: [],
      datasets: { label: "방문자", data: [] },
    };
  }
};

export default dailyVisitCountData;
