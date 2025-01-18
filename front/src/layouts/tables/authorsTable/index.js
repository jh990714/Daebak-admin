import { useEffect, useState, useMemo } from "react";
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
import DataTable from "examples/Tables/DataTable";
import { useDispatch, useSelector } from "react-redux";

import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, TextField } from "@mui/material";
import { fetchMembers } from "reducers/slices/memberSlice";
import useDebounce from "util/useDebounce";

function AuthorsTable() {
  const dispatch = useDispatch();
  const { dataColumns: columns, dataRows: rows } = authorsTableData();
  const [addPointsSelectRows, setAddPointsSelectRows] = useState(false);
  const [addCouponSelectRows, setAddCouponSelectRows] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedMembers, setSelectMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 디바운싱된 검색어

  const [pageIndex, setPageIndex] = useState(0);
  const { members } = useSelector((state) => state.members);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleShowDialog = (dialogType) => {
    dialogType === "points"
      ? setAddPointsSelectRows(!addPointsSelectRows)
      : setAddCouponSelectRows(!addCouponSelectRows);
  };

  const handleSelectedRows = (selectedRows) => {
    const selectedRowData = selectedRows.map((id) => members.find((member) => member.id === id));
    setSelectMembers(selectedRowData);
  };

  const handleRefresh = () => {
    dispatch(fetchMembers())
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const search = debouncedSearchTerm.toLowerCase();
      return (
        row.id?.toLowerCase().includes(search) ||
        row.author?.props?.name?.toLowerCase().includes(search) ||
        row.email?.toLowerCase().includes(search) ||
        row.phone?.toLowerCase().includes(search) ||
        row.address?.toLowerCase().includes(search)
      );
    });
  }, [rows, debouncedSearchTerm]);

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
                <MDButton variant="h2" color="white" onClick={() => handleShowDialog("points")}>
                  적립금 추가
                </MDButton>
                <MDButton variant="h2" color="white" onClick={() => handleShowDialog("coupon")}>
                  쿠폰 추가
                </MDButton>
                <IconButton color="white" onClick={handleRefresh}>
                  <RefreshIcon />
                </IconButton>
              </div>
            </div>
          </MDTypography>
        </MDBox>
        <MDBox p={3}>
          <MDBox display="flex" justifyContent="flex-end" mr={2}>
            <TextField
              label="상품 검색"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // 실시간 입력 시 searchTerm 업데이트
              style={{ width: "200px" }} // 크기 줄이기
            />
          </MDBox>
          <DataTable
            table={{ columns: columns, rows: filteredRows }}
            isSorted={true}
            entriesPerPage={true}
            pagination={{ variant: "gradient", color: "info" }}
            showTotalEntries={true}
            noEndBorder
            defaultPage={pageIndex}
            onPageChange={handlePageChange}
            isCheckBox={true}
            onSelectedRows={handleSelectedRows}
          />
        </MDBox>
      </Card>
      <AddCouponDialog
        selectMembers={selectedMembers}
        isOpen={addCouponSelectRows}
        onClose={() => setAddCouponSelectRows(!addCouponSelectRows)}
      />
      <AddPointsDialog
        selectMembers={selectedMembers}
        isOpen={addPointsSelectRows}
        onClose={() => setAddPointsSelectRows(!addPointsSelectRows)}
      />
    </Grid>
  );
}

export default AuthorsTable;
