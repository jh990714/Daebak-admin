import React from "react";

import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export const ProductSubInfo = () => {
  return (
    <Card>
      <MDBox
        mx={2}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          삼품 세부정보
        </MDTypography>
      </MDBox>
      <MDBox></MDBox>
    </Card>
  );
};
