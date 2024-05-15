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

// @mui material components
import React, { useState } from "react";

import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import MDPagination from "components/MDPagination";
import Icon from "@mui/material/Icon";

function BillingInformation() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지에 보여줄 항목 수

  const billingInfos = [
    {
      id: "jh0714",
      name: "장준혁",
      orderNumber: "20240506_00000011",
      orderAt: "2024. 5. 6. 오후 10:10:45",
      orderItems: [
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
      ],
      amount: 3000,
    },
    {
      id: "lgd789",
      name: "이광득",
      orderNumber: "20240506_00000011",
      orderAt: "2024. 5. 6. 오후 10:10:45",
      orderItems: [
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
      ],
      amount: 3000,
    },
    {
      id: "jh0714",
      name: "장준혁",
      orderNumber: "20240506_00000010",
      orderAt: "2024. 5. 6. 오후 10:10:45",
      orderItems: [
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
      ],
      amount: 3000,
    },
    {
      id: "lgd789",
      name: "이광득",
      orderNumber: "20240506_00000011",
      orderAt: "2024. 5. 6. 오후 10:10:45",
      orderItems: [
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
      ],
      amount: 3000,
    },
    {
      id: "jh0714",
      name: "장준혁",
      orderNumber: "20240506_00000010",
      orderAt: "2024. 5. 6. 오후 10:10:45",
      orderItems: [
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
      ],
      amount: 3000,
    },
    {
      id: "lgd789",
      name: "이광득",
      orderNumber: "20240506_00000011",
      orderAt: "2024. 5. 6. 오후 10:10:45",
      orderItems: [
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
      ],
      amount: 3000,
    },
    {
      id: "jh0714",
      name: "장준혁",
      orderNumber: "20240506_00000010",
      orderAt: "2024. 5. 6. 오후 10:10:45",
      orderItems: [
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
      ],
      amount: 3000,
    },
    {
      id: "lgd789",
      name: "이광득",
      orderNumber: "20240506_00000011",
      orderAt: "2024. 5. 6. 오후 10:10:45",
      orderItems: [
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
      ],
      amount: 3000,
    },
    {
      id: "jh0714",
      name: "장준혁",
      orderNumber: "20240506_00000011",
      orderAt: "2024. 5. 6. 오후 10:10:45",
      orderItems: [
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
      ],
      amount: 3000,
    },
    {
      id: "jh0714",
      name: "장준혁",
      orderNumber: "20240506_00000011",
      orderAt: "2024. 5. 6. 오후 10:10:45",
      orderItems: [
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
      ],
      amount: 3000,
    },
    {
      id: "lgd789",
      name: "이광득",
      orderNumber: "20240506_00000011",
      orderAt: "2024. 5. 6. 오후 10:10:45",
      orderItems: [
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
      ],
      amount: 3000,
    },
    {
      id: "jh0714",
      name: "장준혁",
      orderNumber: "20240506_00000010",
      orderAt: "2024. 5. 6. 오후 10:10:45",
      orderItems: [
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
        { itemName: "신안 급냉 꽃게 (소) 1kg", quantity: 1, amount: 3000 },
      ],
      amount: 3000,
    },
  ];

  // 현재 페이지의 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = billingInfos.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, Math.ceil(billingInfos.length / itemsPerPage))));
  };

  const getPaginationItems = () => {
    const totalPages = Math.ceil(billingInfos.length / itemsPerPage);
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    return [...Array(endPage - startPage + 1).keys()].map((index) => startPage + index);
  };

  const handleLastPageClick = () => {
    const totalPages = Math.ceil(billingInfos.length / itemsPerPage);
    setCurrentPage(totalPages);
  };
  return (
    <Card>
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          결제 정보
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {currentData.map((billingInfo, index) => (
            <Bill
              key={index}
              id={billingInfo.id}
              name={billingInfo.name}
              orderNumber={billingInfo.orderNumber}
              orderAt={billingInfo.orderAt}
              orderItems={billingInfo.orderItems}
              amount={billingInfo.amount}
            />
          ))}
        </MDBox>
      </MDBox>
      <MDPagination>
        <MDPagination item onClick={() => handlePageChange(1)}>
          <Icon>first_page</Icon>
        </MDPagination>
        <MDPagination item onClick={() => handlePageChange(currentPage - 1)}>
          <Icon>keyboard_arrow_left</Icon>
        </MDPagination>
        {getPaginationItems().map((page) => (
          <MDPagination
            key={page}
            item
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </MDPagination>
        ))}

        <MDPagination item onClick={() => handlePageChange(currentPage + 1)}>
          <Icon>keyboard_arrow_right</Icon>
        </MDPagination>
        <MDPagination item onClick={handleLastPageClick}>
          <Icon>last_page</Icon>
        </MDPagination>
      </MDPagination>
    </Card>
  );
}

export default BillingInformation;
