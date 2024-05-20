import { React, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DataTable from "examples/Tables/DataTable";

import productDealData from "./data/productDealData";
import { ProductDealAddDialog } from "./dialog/productDealAddDialog";

export const ProductDealTable = () => {
  const [showProductDeal, setShowProductDeal] = useState(false);

  const { columns: productDealsColumns, rows: productDealsRows } = productDealData();

  const handleAddProductDeal = () => {
    setShowProductDeal(!showProductDeal);
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
      {showProductDeal && <ProductDealAddDialog isOpen={true} onClose={handleAddProductDeal} />}
    </>
  );
};
