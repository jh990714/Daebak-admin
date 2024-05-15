import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import reviewTableData from "layouts/tables/reviewTable/data/reviewTableData";
import { ReviewCustomTable } from "./reviewCustomTable";

function ReviewTable() {
  const {
    columns: completedReviewColumns,
    rows: completedReviewRows,
    missingColumns: missingReviewColumns,
    missingRows: missingReviewRows,
  } = reviewTableData();

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
            <ReviewCustomTable columns={missingReviewColumns} rows={missingReviewRows} />
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
            <ReviewCustomTable columns={completedReviewColumns} rows={completedReviewRows} />
          </MDBox>
        </Card>
      </Grid>
    </>
  );
}
export default ReviewTable;
