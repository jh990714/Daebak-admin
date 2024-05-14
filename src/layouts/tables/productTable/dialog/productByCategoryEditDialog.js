import React, { useState } from "react";

import PropTypes from "prop-types";

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import { ProductCategory } from "layouts/productAdd/component/productCategory";

export const ProductByCategoryEditDialog = ({ rowData, isOpen, onClose }) => {
  const [data, setData] = useState({
    parentId: null,
    childId: rowData.category,
  });

  const handleSubmit = () => {
    console.log(data);
  };
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={"xl"}>
      <DialogContent>
        <ProductCategory rowData={rowData} setRowData={setData} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

ProductByCategoryEditDialog.propTypes = {
  rowData: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      productName: PropTypes.string.isRequired,
      regularPrice: PropTypes.number.isRequired,
      salePrice: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      stockQuantity: PropTypes.number.isRequired,
      recommended: PropTypes.number.isRequired,
      maxQuantityPerDelivery: PropTypes.number.isRequired,
    })
  ),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
