import React, { useState } from "react";

import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

export const ProductOption = ({ rowData, setRowData }) => {
  const handleAddRow = () => {
    setRowData([...rowData, { optionName: "", optionAmount: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rowData];
    newRows[index][field] = value;
    setRowData(newRows);
  };

  const dataColumns = [
    { Header: "옵션명", accessor: "optionName", align: "left" },
    { Header: "추가 가격", accessor: "optionAmount", align: "left" },
  ];

  const renderRows = () => {
    return rowData.map((row, index) => ({
      optionName: (
        <TextField
          value={row.optionName}
          onChange={(e) => handleInputChange(index, "optionName", e.target.value)}
          variant="outlined"
          fullWidth
        />
      ),
      optionAmount: (
        <TextField
          type="number"
          value={row.optionAmount}
          onChange={(e) => handleInputChange(index, "optionAmount", e.target.value)}
          variant="outlined"
          fullWidth
        />
      ),
    }));
  };

  return (
    <Card>
      <MDBox
        mx={2}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          상품 옵션
        </MDTypography>
      </MDBox>
      <MDBox pt={3}>
        <DataTable
          table={{
            columns: dataColumns,
            rows: renderRows(),
          }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
        />
      </MDBox>
      <MDBox m={2} align="center">
        <Button onClick={handleAddRow}>옵션 추가</Button>
      </MDBox>
    </Card>
  );
};

ProductOption.propTypes = {
  rowData: PropTypes.array,
  setRowData: PropTypes.func.isRequired,
};
