import { ProductAdd } from "layouts/productAdd";
import { React, useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, TextField } from "@mui/material";

import ProductAllData from "./data/ProductAllData";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "reducers/slices/productSlice";
import useDebounce from "util/useDebounce";

export const ProductAllTable = () => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(0);
  const [showProduct, setShowProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 디바운싱된 검색어

  const { columns: productsColumns, rows: productsRows } = ProductAllData();

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleAddProduct = () => {
    setShowProduct(!showProduct);
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

  // debouncedSearchTerm을 사용하여 필터링
  const filteredRows = productsRows.filter((row) =>
    row.product.props.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

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
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h5" color="white">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>모든 상품</span>
                <div>
                  <MDButton variant="h2" color="white" onClick={handleAddProduct}>
                    추가
                  </MDButton>
                  <IconButton color="white" onClick={handleRefresh}>
                    <RefreshIcon />
                  </IconButton>
                </div>
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
              table={{ columns: productsColumns, rows: filteredRows }} // 필터링된 rows 사용
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
      {showProduct && <ProductAdd isOpen={true} onClose={handleAddProduct} />}
    </>
  );
};
