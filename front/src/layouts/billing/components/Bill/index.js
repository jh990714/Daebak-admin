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
import React, { useState } from "react";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useMaterialUIController } from "context";
import BillingInfoModal from "./billingInfoModal";

function Bill({ id, memberName, impUid, orderNumber, orderDate, trackingNumber, noGutter }) {
  const [showDetail, setShowDetail] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  const toggleAllItems = () => {
    setShowAllItems(!showAllItems);
  };

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <>
      <MDBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor={darkMode ? "transparent" : "grey-100"}
        borderRadius="lg"
        p={3}
        mb={noGutter ? 0 : 1}
        mt={2}
      >
        <MDBox width="100%" display="flex" flexDirection="column">
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            mb={2}
          >
            <MDTypography variant="button" fontWeight="medium">
              {id}:&nbsp;&nbsp;&nbsp;
              {memberName}
            </MDTypography>
            <MDBox
              display="flex"
              alignItems="center"
              mt={{ xs: 2, sm: 0 }}
              ml={{ xs: -1.5, sm: 0 }}
            >
              {!trackingNumber && (
                <MDBox mr={1}>
                  <MDButton variant="text" color="info">
                    <Icon>local_shipping</Icon>&nbsp;운송장 번호 등록
                  </MDButton>
                </MDBox>
              )}
              <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={toggleDetail}>
                <Icon>edit</Icon>&nbsp;상세 정보 보기
              </MDButton>
              <MDBox mr={1}>
                <MDButton variant="text" color="error">
                  <Icon>delete</Icon>&nbsp;결제 취소
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
          <MDBox mb={2} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              포트원 거래번호:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {impUid}
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              주문 번호:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                {orderNumber}
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mb={2} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              주문 날짜:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {orderDate}
              </MDTypography>
            </MDTypography>
          </MDBox>
          {trackingNumber && (
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                운송장 번호:&nbsp;&nbsp;&nbsp;
                <MDTypography variant="caption" fontWeight="medium">
                  {trackingNumber}
                </MDTypography>
              </MDTypography>
            </MDBox>
          )}
        </MDBox>
      </MDBox>
      <BillingInfoModal
        showDetail={showDetail}
        toggleDetail={toggleDetail}
        orderNumber={orderNumber}
      />
    </>
  );
}

Bill.defaultProps = {
  noGutter: false,
};

Bill.propTypes = {
  id: PropTypes.string.isRequired,
  memberName: PropTypes.string.isRequired,
  impUid: PropTypes.string.isRequired,
  orderNumber: PropTypes.string.isRequired,
  orderDate: PropTypes.string.isRequired,
  trackingNumber: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
