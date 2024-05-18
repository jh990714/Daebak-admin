import { ProductAdd } from "layouts/productAdd";
import { React, useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";

import ProductAllData from "./data/ProductAllData";

export const ProductAllTable = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [showProduct, setShowProduct] = useState(false);

  const { columns: productsColumns, rows: productsRows } = ProductAllData();

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleAddProduct = () => {
    setShowProduct(!showProduct);
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
                <MDButton variant="h2" color="white" onClick={handleAddProduct}>
                  추가
                </MDButton>
              </div>
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              table={{ columns: productsColumns, rows: productsRows }}
              isSorted={true}
              entriesPerPage={true}
              pagination={{ variant: "gradient", color: "info" }}
              showTotalEntries={true}
              canSearch={true}
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
