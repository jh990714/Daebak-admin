import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import qnaTableData from "./data/qnaTableData";
import { QnaCustomTable } from "./qnaTable/qnaCustomTable";

function QnaTable() {
  const {
    columns: completedQnaColumns,
    rows: completedQnawRows,
    missingColumns: missingQnawColumns,
    missingRows: missingQnawRows,
  } = qnaTableData();

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
            <QnaCustomTable columns={missingQnawColumns} rows={missingQnawRows} />
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
            <QnaCustomTable columns={completedQnaColumns} rows={completedQnawRows} />
          </MDBox>
        </Card>
      </Grid>
    </>
  );
}
export default QnaTable;
