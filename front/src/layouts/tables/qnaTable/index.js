import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { DataGrid } from "@mui/x-data-grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import qnaTableData from "./data/qnaTableData";
import { qnaTableDataGrid } from "./data/qnaTableDataGrid";
import DataTable from "examples/Tables/DataTable";

function QnaTable() {
  const {
    columns: completedQnaColumns,
    rows: completedQnawRows,
    missingColumns: missingQnawColumns,
    missingRows: missingQnawRows,
    expanded: expanded,
  } = qnaTableData();

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
              Q&A (답변 미등록)
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              canSearch={true}
              table={{ columns: missingQnawColumns, rows: missingQnawRows }}
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
              Q&A (답변 등록 완료)
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              canSearch={true}
              table={{ columns: completedQnaColumns, rows: completedQnawRows }}
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
export default QnaTable;
