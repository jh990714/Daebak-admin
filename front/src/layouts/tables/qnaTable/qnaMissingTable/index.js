import { React, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

import qnaMissingData from "./data/qnaMissingData";
import { ExpandedContent } from "../expanded/expandedQna";

export const QnaMissingTable = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const { columns: missingQnaColumns, rows: missingQnaRows, expanded: expanded } = qnaMissingData();

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
            table={{ columns: missingQnaColumns, rows: missingQnaRows }}
            isSorted={true}
            entriesPerPage={true}
            showTotalEntries={true}
            noEndBorder
            defaultPage={pageIndex}
            onPageChange={handlePageChange}
            expanded={(rowData) => <ExpandedContent rowData={rowData} />}
          />
        </MDBox>
      </Card>
    </Grid>
  );
};
