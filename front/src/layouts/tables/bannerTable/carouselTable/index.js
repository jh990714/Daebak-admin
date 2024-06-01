import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { carouselsTableData } from "./data/carouselsTableData";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { CarouselEditDialog } from "./dialog/carouselEditDialog";

export const CarouselTable = () => {
  const [rowData, setRowData] = useState({
    carouselId: null,
    imageUrl: null,
    link: null,
  });
  const { dataColumns: columns, dataRows: rows } = carouselsTableData();
  const [addCarousel, setAddCarousel] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleShowAddCarousel = () => {
    setAddCarousel(!addCarousel);
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
              <span>캐러샐</span>
              <MDButton variant="h2" color="white" onClick={handleShowAddCarousel}>
                추가
              </MDButton>
            </div>
          </MDTypography>
        </MDBox>
        <MDBox pt={3}>
          <DataTable
            table={{ columns: columns, rows: rows }}
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
      <CarouselEditDialog rowData={rowData} isOpen={addCarousel} onClose={handleShowAddCarousel} />
    </Grid>
  );
};
