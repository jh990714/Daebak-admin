import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import { promotionalVideoTableData } from "./data/promotionalVideoTableData";

export const VideoTable = () => {
  const [rowData, setRowData] = useState({
    carouselId: null,
    imageUrl: null,
    link: null,
  });
  const { dataColumns: columns, dataRows: rows } = promotionalVideoTableData();
  const [addVideo, setAddVideo] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleShowAddVideo = () => {
    setAddVideo(!addCarousel);
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
          bgColor="error"
          borderRadius="lg"
          coloredShadow="error"
        >
          <MDTypography variant="h5" color="white">
            홍보 영상
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
    </Grid>
  );
};
