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
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useSelector } from "react-redux";
import Loading from "components/Loading";

function BillingInformation() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지에 보여줄 항목 수

  const { paymentDetails, status } = useSelector((state) => state.paymentDetails);

  const [filter, setFilter] = useState("all");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredBillingInfos = paymentDetails.filter((info) => {
    if (filter === "withTracking") {
      return info.trackingNumber !== null;
    }
    if (filter === "withoutTracking") {
      return info.trackingNumber === null;
    }
    return true;
  });

  // 현재 페이지의 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredBillingInfos.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(
      Math.max(1, Math.min(page, Math.ceil(filteredBillingInfos.length / itemsPerPage)))
    );
  };

  const getPaginationItems = () => {
    const totalPages = Math.ceil(filteredBillingInfos.length / itemsPerPage);
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    return [...Array(endPage - startPage + 1).keys()].map((index) => startPage + index);
  };

  const handleLastPageClick = () => {
    const totalPages = Math.ceil(filteredBillingInfos.length / itemsPerPage);
    setCurrentPage(totalPages);
  };

  // if (status === "loading") {
  //   console.log("paymentDetails is loading ...");
  //   return <Loading />;
  // }
  return <Loading />;
  // return (
  //   <Card>
  //     <MDBox pt={3} px={2}>
  //       <MDTypography variant="h6" fontWeight="medium">
  //         결제 정보
  //       </MDTypography>
  //       <FormGroup row>
  //         <FormControlLabel
  //           control={
  //             <Checkbox
  //               color="primary"
  //               checked={filter === "all"}
  //               onChange={handleFilterChange}
  //               value="all"
  //             />
  //           }
  //           label="전체 보기"
  //         />
  //         <FormControlLabel
  //           control={
  //             <Checkbox
  //               color="primary"
  //               checked={filter === "withTracking"}
  //               onChange={handleFilterChange}
  //               value="withTracking"
  //             />
  //           }
  //           label="운송장 번호 등록"
  //         />
  //         <FormControlLabel
  //           control={
  //             <Checkbox
  //               color="primary"
  //               checked={filter === "withoutTracking"}
  //               onChange={handleFilterChange}
  //               value="withoutTracking"
  //             />
  //           }
  //           label="운송장 번호 미등록"
  //         />
  //       </FormGroup>
  //     </MDBox>
  //     <MDBox pt={1} pb={2} px={2}>
  //       <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
  //         {currentData.map((billingInfo, index) => (
  //           <Bill
  //             key={index}
  //             id={billingInfo.id}
  //             memberName={billingInfo.memberName}
  //             impUid={billingInfo.impUid}
  //             orderNumber={billingInfo.orderNumber}
  //             orderDate={billingInfo.orderDate}
  //             trackingNumber={billingInfo.trackingNumber}
  //           />
  //         ))}
  //       </MDBox>
  //     </MDBox>
  //     <MDPagination>
  //       <MDPagination item onClick={() => handlePageChange(1)}>
  //         <Icon>first_page</Icon>
  //       </MDPagination>
  //       <MDPagination item onClick={() => handlePageChange(currentPage - 1)}>
  //         <Icon>keyboard_arrow_left</Icon>
  //       </MDPagination>
  //       {getPaginationItems().map((page) => (
  //         <MDPagination
  //           key={page}
  //           item
  //           active={page === currentPage}
  //           onClick={() => handlePageChange(page)}
  //         >
  //           {page}
  //         </MDPagination>
  //       ))}

  //       <MDPagination item onClick={() => handlePageChange(currentPage + 1)}>
  //         <Icon>keyboard_arrow_right</Icon>
  //       </MDPagination>
  //       <MDPagination item onClick={handleLastPageClick}>
  //         <Icon>last_page</Icon>
  //       </MDPagination>
  //     </MDPagination>
  //   </Card>
  // );
}

export default BillingInformation;
