import { React, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, TextField } from "@mui/material";

import productBestData from "./data/productBestData";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "reducers/slices/productSlice";
import useDebounce from "util/useDebounce";

export const ProductBestTable = () => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 디바운싱된 검색어

  const { columns: bestProductsColumns, rows: bestProductsRows } = productBestData();

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleRefresh = () => {
    dispatch(fetchProducts())
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });
  };

  const filteredRows = bestProductsRows.filter((row) =>
    row.product.props.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );
  return (
    <Grid item xs={12}>
      <Card>
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          variant="gradient"
          bgColor="error"
          borderRadius="lg"
          coloredShadow="error"
        >
          <MDTypography variant="h5" color="white">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>인기상품</span>
              <IconButton color="white" onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </div>
          </MDTypography>
        </MDBox>
        <MDBox pt={3}>
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
            table={{ columns: bestProductsColumns, rows: filteredRows }}
            isSorted={true}
            entriesPerPage={true}
            pagination={{ variant: "gradient", color: "info" }}
            showTotalEntries={true}
            noEndBorder
            defaultPage={pageIndex}
            onPageChange={handlePageChange}
          />
        </MDBox>
      </Card>
    </Grid>
  );
};
