import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";

import { couponTableData } from "./data/couponTableData";
import { CouponDialog } from "../../couponAdd";
import { useSelector } from "react-redux";

export const CouponTable = () => {
  const { status } = useSelector((state) => state.coupons);

  const [pageIndex, setPageIndex] = useState(0);
  const [showAddCoupon, setShowAddCoupon] = useState(false);

  const { columns: couponColumns, rows: couponRows } = couponTableData();

  const handleCloseDialog = () => {
    setShowAddCoupon(!showAddCoupon);
  };

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Grid item xs={12}>
      <Card>
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          variant="gradient"
          bgColor="error"
          borderRadius="lg"
          coloredShadow="error"
        >
          <MDTypography variant="h5" color="white">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>쿠폰</span>
              <MDButton variant="h2" color="white" onClick={() => setShowAddCoupon(true)}>
                추가
              </MDButton>
            </div>
          </MDTypography>
        </MDBox>
        <MDBox pt={3}>
          <DataTable
            table={{ columns: couponColumns, rows: couponRows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
            defaultPage={pageIndex}
            onPageChange={handlePageChange}
          />
        </MDBox>
      </Card>
      <CouponDialog isOpen={showAddCoupon} onClose={handleCloseDialog} />
    </Grid>
  );
};
