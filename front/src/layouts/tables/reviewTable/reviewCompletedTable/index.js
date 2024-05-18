import { React, useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";

import reviewCompletedData from "./data/reviewCompletedData";

export const ReviewCompletedTable = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const {
    columns: completedReviewColumns,
    rows: completedReviewRows,
    expanded: expanded,
  } = reviewCompletedData();

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
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
          <MDTypography variant="h6" color="white">
            상품 후기 (답변 등록 완료)
          </MDTypography>
        </MDBox>
        <MDBox pt={3}>
          <DataTable
            canSearch={true}
            table={{ columns: completedReviewColumns, rows: completedReviewRows }}
            isSorted={true}
            entriesPerPage={true}
            showTotalEntries={true}
            noEndBorder
            defaultPage={pageIndex}
            onPageChange={handlePageChange}
            expanded={expanded}
          />
        </MDBox>
      </Card>
    </Grid>
  );
};
