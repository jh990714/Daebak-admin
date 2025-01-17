/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { fetchVisitCount } from "api/visitCount";
import React, { useEffect, useState } from "react";

const dailyVisitCountData = async (startDate, endDate) => {
  try {
    const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const counts = await Promise.all(
      Array.from({ length: daysDiff + 1 }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        return fetchVisitCount(date);
      })
    );
    const labels = Array.from({ length: daysDiff + 1 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return `${date.getMonth() + 1}.${date.getDate()}`; // 원하는 형식으로 날짜 포맷 변경 가능
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
