import { React, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

import recommendedProductsTableData from "./data/recommendedProductsTableData";

export const RecommendedProductTable = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const { columns: recommendedProductsColumns, rows: recommendedProductsRows } =
    recommendedProductsTableData();

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
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
            추천 상품
          </MDTypography>
        </MDBox>
        <MDBox pt={3}>
          <DataTable
            table={{ columns: recommendedProductsColumns, rows: recommendedProductsRows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
            defaultPage={pageIndex}
            onPageChange={handlePageChange}
          />
        </MDBox>
      </Card>
    </Grid>
  );
};
