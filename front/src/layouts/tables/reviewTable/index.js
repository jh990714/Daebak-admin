import { useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import reviewTableData from "layouts/tables/reviewTable/data/reviewTableData";
import DataTable from "examples/Tables/DataTable";

function ReviewTable() {
  const {
    columns: completedReviewColumns,
    rows: completedReviewRows,
    missingColumns: missingReviewColumns,
    missingRows: missingReviewRows,
    expanded: expanded,
  } = reviewTableData();

  const [pageIndex, setPageIndex] = useState(0);
  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="warning"
            borderRadius="lg"
            coloredShadow="warning"
          >
            <MDTypography variant="h6" color="white">
              상품 후기 (답변 미등록)
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              canSearch={true}
              table={{ columns: missingReviewColumns, rows: missingReviewRows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
              defaultPage={pageIndex}
              onPageChange={handlePageChange}
              expanded={expanded}
            />
          </MDBox>
        </Card>
      </Grid>
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
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
              defaultPage={pageIndex}
              onPageChange={handlePageChange}
              expanded={expanded}
            />
          </MDBox>
        </Card>
      </Grid>
    </>
  );
}
export default ReviewTable;
