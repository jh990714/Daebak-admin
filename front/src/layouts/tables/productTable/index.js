import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DataTable from "examples/Tables/DataTable";

import productByCategoryTableData from "layouts/tables/productTable/data/productByCategoryTableData";
import recommendedProductsTableData from "layouts/tables/productTable/data/recommendedProductsTableData";
import productDealsTableData from "layouts/tables/productTable/data/productDealsTableData";

function ProductTable() {
  const [showProductDeal, setShowProductDeal] = useState(false);
  const [showProduct, setShowProduct] = useState(false);

  const { columns: productsColumns, rows: productsRows } = productByCategoryTableData();
  // const { columns: recommendedProductsColumns, rows: recommendedProductsRows } =
  //   recommendedProductsTableData();
  const { columns: productDealsColumns, rows: productDealsRows } = productDealsTableData();

  const handleAddProductDeal = () => {
    setShowProductDeal(!showProductDeal);
  };

  const handleAddProduct = () => {
    setShowProduct(!showProduct);
  };

  useEffect(() => {
    console.log("index");
  }, []);

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
                <span>타임 특가 상품</span>
                <MDButton variant="h2" color="white" onClick={handleAddProductDeal}>
                  추가
                </MDButton>
              </div>
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              table={{ columns: productDealsColumns, rows: productDealsRows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
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
            bgColor="error"
            borderRadius="lg"
            coloredShadow="error"
          >
            <MDTypography variant="h5" color="white">
              추천 상품
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              table={{ columns: [], rows: [] }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
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
            />
          </MDBox>
        </Card>
      </Grid>
      {/* {showProductDeal && (
        <ProductDealsDialog
          rowData={rowData}
          setRowData={setRowData}
          isOpen={true}
          handleEditDialogClose={handleAddProductDeal}
          handleEditDialogSubmit={handleAddProductDeal}
        />
      )} */}

      {/* {showProduct && <ProductAdd isOpen={true} onClose={handleAddProduct} />} */}
    </>
  );
}
export default ProductTable;
