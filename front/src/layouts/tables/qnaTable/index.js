import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { DataGrid } from "@mui/x-data-grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import qnaTableData from "./data/qnaTableData";
import { qnaTableDataGrid } from "./data/qnaTableDataGrid";

function QnaTable() {
  const {
    columns: completedQnaColumns,
    rows: completedQnawRows,
    missingColumns: missingQnawColumns,
    missingRows: missingQnawRows,
  } = qnaTableDataGrid();

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const handleRowSelectionModel = (newRowSelectionModel) => {
    console.log(newRowSelectionModel);
    setRowSelectionModel(newRowSelectionModel);
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
          <MDBox p={3}>
            <DataGrid
              rows={missingQnawRows}
              columns={missingQnawColumns}
              autoHeight
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              pageSizeOptions={[5, 10, 25]}
              disableRowSelectionOnClick
              onRowSelectionModelChange={handleRowSelectionModel}
              rowSelectionModel={rowSelectionModel}
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
          <MDBox p={3}>
            <DataGrid
              rows={completedQnawRows}
              columns={completedQnaColumns}
              rowHeight={100}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              pageSizeOptions={[5, 10, 25]}
              disableRowSelectionOnClick
              onRowSelectionModelChange={handleRowSelectionModel}
              rowSelectionModel={rowSelectionModel}
            />
          </MDBox>
        </Card>
      </Grid>
    </>
  );
}
export default QnaTable;
