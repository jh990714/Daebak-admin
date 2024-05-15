import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { DataGrid } from "@mui/x-data-grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import authorsTableData from "layouts/tables/authorsTable/data/authorsTableData";
import { AddCouponDialog } from "./dialog/addCouponDialog";
import { AddPointsDialog } from "./dialog/addPointsDialog";

function AuthorsTable() {
  const { columns, rows } = authorsTableData();
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [addPointsSelectRows, setAddPointsSelectRows] = useState(false);
  const [addCouponSelectRows, setAddCouponSelectRows] = useState(false);

  const handleRowSelectionModel = (newRowSelectionModel) => {
    console.log(newRowSelectionModel);
    setRowSelectionModel(newRowSelectionModel);
  };

  const handleShowAddPointsDialog = () => {
    setAddPointsSelectRows(!addPointsSelectRows);
  };

  const handleShowAddCouponDialog = () => {
    setAddCouponSelectRows(!addCouponSelectRows);
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
          bgColor="success"
          borderRadius="lg"
          coloredShadow="success"
        >
          <MDTypography variant="h5" color="white">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>사용자</span>
              <div>
                <MDButton variant="h2" color="white" onClick={handleShowAddPointsDialog}>
                  적립금 추가
                </MDButton>
                <MDButton variant="h2" color="white" onClick={handleShowAddCouponDialog}>
                  쿠폰 추가
                </MDButton>
              </div>
            </div>
          </MDTypography>
        </MDBox>
        <MDBox p={3}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={handleRowSelectionModel}
            rowSelectionModel={rowSelectionModel}
          />
        </MDBox>
      </Card>
      <AddCouponDialog
        selectRows={rowSelectionModel}
        isOpen={addCouponSelectRows}
        onClose={() => setAddCouponSelectRows(!addCouponSelectRows)}
      />
      <AddPointsDialog
        selectRows={rowSelectionModel}
        isOpen={addPointsSelectRows}
        onClose={() => setAddPointsSelectRows(!addPointsSelectRows)}
      />
    </Grid>
  );
}

export default AuthorsTable;
