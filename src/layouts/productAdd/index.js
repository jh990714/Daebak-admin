import React, { useState } from "react";
import PropTypes from "prop-types";
import { Autocomplete, TextField, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";

import DataTable from "examples/Tables/DataTable";
import { ProductInfo } from "./component/productInfo";
import { ProductCategory } from "./component/productCategory";
import { ProductSubInfo } from "./component/productSubInfo";
export const ProductAdd = ({ isOpen, onClose }) => {
  const [productCategory, setProductCategory] = useState("");
  const [productInfo, setProductInfo] = useState("");

  const handleDialogSubmit = () => {
    console.log(productCategory);
    console.log(productInfo);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={"xl"}>
      <DialogTitle>상품 등록</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <ProductCategory setRowData={setProductCategory} />
        <ProductInfo rowData={productInfo} setRowData={setProductInfo} />
        <ProductSubInfo />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleDialogSubmit}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

ProductAdd.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
