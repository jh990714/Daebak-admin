import React from "react";
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import { Autocomplete, TextField, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "examples/Tables/DataTable";

export const ProductDealsEditDialog = ({
  rowData,
  setRowData,
  isOpen,
  handleEditDialogClose,
  handleEditDialogSubmit,
}) => {
  const dataColumns = [
    { Header: "상품", accessor: "product", align: "left" },
    { Header: "추가 할인", accessor: "dealPrice", align: "center" },
    { Header: "시작 시간", accessor: "startDate", align: "center" },
    { Header: "종료 시간", accessor: "endDate", align: "center" },
  ];

  return (
    <Dialog open={isOpen} onClose={handleEditDialogClose} fullWidth={true} maxWidth={"xl"}>
      <DialogTitle>행 수정</DialogTitle>
      <DialogContent>
        <Card>
          <MDBox
            mx={2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="error"
            borderRadius="lg"
            coloredShadow="error"
          >
            <MDTypography variant="h6" color="white">
              타임 특가 상품
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              table={{
                columns: dataColumns,
                rows: [
                  {
                    product: (
                      // <MDBox>
                      //   <Autocomplete
                      //     options={products}
                      //     sx={{ width: 300 }}
                      //     getOptionLabel={(option) => option.name}
                      //     value={
                      //       rowData?.name
                      //         ? products.find((product) => product.name === rowData.name)
                      //         : null
                      //     }
                      //     onChange={(event, newValue) => {
                      //       if (newValue) {
                      //         setRowData({ ...rowData, name: newValue.name });
                      //       }
                      //     }}
                      //     renderInput={(params) => <TextField {...params} label="상품명" />}
                      //   />
                      // </MDBox>
                      <MDTypography
                        display="block"
                        variant="button"
                        fontWeight="medium"
                        ml={1}
                        lineHeight={1}
                      >
                        {rowData.name}
                      </MDTypography>
                    ),
                    dealPrice: (
                      <MDInput
                        type="number"
                        label="추가할인"
                        value={rowData?.dealPrice}
                        onChange={(e) => {
                          const newData = { ...rowData, dealPrice: e.target.value };
                          setRowData(newData);
                        }}
                      />
                    ),
                    startDate: (
                      <MDInput
                        type="datetime"
                        label="시작 시간"
                        value={rowData?.startDate}
                        onChange={(e) => {
                          const newData = { ...rowData, startDate: e.target.value };
                          setRowData(newData);
                        }}
                      />
                    ),
                    endDate: (
                      <MDInput
                        type="datetime"
                        label="종료 시간"
                        value={rowData?.endDate}
                        onChange={(e) => {
                          const newData = { ...rowData, endDate: e.target.value };
                          setRowData(newData);
                        }}
                      />
                    ),
                  },
                ],
              }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
            />
          </MDBox>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditDialogClose}>취소</Button>
        <Button onClick={handleEditDialogSubmit}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

ProductDealsEditDialog.propTypes = {
  rowData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      dealPrice: PropTypes.number.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    })
  ),
  setRowData: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleEditDialogClose: PropTypes.func.isRequired,
  handleEditDialogSubmit: PropTypes.func.isRequired,
};
