import React, { useState } from "react";

import DataTable from "examples/Tables/DataTable";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton } from "@mui/material";

import { useDispatch } from "react-redux";
import { adTableData } from "./data/adTableData";
import { fetchAd } from "reducers/slices/adSlice";
import { AdEditDialog } from "./dialog/adEditDialog";

export const AdsTable = () => {
  const dispatch = useDispatch();
  const rowData = {
    adId: null,
    imageUrl: null,
    linkUrl: null,
    startDate: null,
    endDate: null,
  };
  const { dataColumns: columns, dataRows: rows } = adTableData();
  const [addAd, setAddAD] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleShowAddAd = () => {
    setAddAD(!addAd);
  };

  const handleRefresh = () => {
    dispatch(fetchAd())
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>광고 팝업</span>
              <div>
                <MDButton variant="h2" color="white" onClick={handleShowAddAd}>
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
      <AdEditDialog rowData={rowData} mode="create" isOpen={addAd} onClose={handleShowAddAd} />
    </Grid>
  );
};
