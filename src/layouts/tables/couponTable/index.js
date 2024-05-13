import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";

import { couponTableData } from "./data/couponTableData";
import { CouponDialog } from "../../couponAdd";

export const CouponTable = () => {
  const { columns: couponColumns, rows: couponRows } = couponTableData();
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const handleCloseDialog = () => {
    setShowAddCoupon(!showAddCoupon);
  };

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
          />
        </MDBox>
      </Card>
      <CouponDialog isOpen={showAddCoupon} onClose={handleCloseDialog} />
    </Grid>
  );
};
