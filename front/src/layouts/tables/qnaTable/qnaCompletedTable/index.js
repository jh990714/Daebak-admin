import { React, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

import qnaCompletedData from "./data/qnaCompletedData";

export const QnaCompletedTable = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const {
    columns: completedQnaColumns,
    rows: completedQnaRows,
    expanded: expanded,
  } = qnaCompletedData();

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
            Q&A (답변 등록 완료)
          </MDTypography>
        </MDBox>
        <MDBox pt={3}>
          <DataTable
            canSearch={true}
            table={{ columns: completedQnaColumns, rows: completedQnaRows }}
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
