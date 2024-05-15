import React, { useState } from "react";

import PropTypes from "prop-types";

import couponDatas from "layouts/tables/couponTable/data/couponDatas";

import { Autocomplete, Button, TextField } from "@mui/material";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export const AddCouponDialog = ({ selectRows, isOpen, onClose }) => {
  const [coupon, setCoupon] = useState();
  const coupons = couponDatas;
  const handleSubmit = () => {
    console.log(selectRows, coupon);
    onClose();
  };

  const handleCouponChange = (event, value) => {
    setCoupon(value);
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <Card>
          <MDBox
            mx={2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="success"
            borderRadius="lg"
            coloredShadow="success"
          >
            <MDTypography variant="h6" color="white">
              쿠폰 추가
            </MDTypography>
          </MDBox>
          <MDBox p={3}>
            <Autocomplete
              options={coupons}
              sx={{ width: 500 }}
              getOptionLabel={(option) => option.couponName}
              value={coupon}
              onChange={handleCouponChange}
              renderInput={(params) => <TextField {...params} label="추가 쿠폰선택" />}
            />
          </MDBox>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit}>추가</Button>
      </DialogActions>
    </Dialog>
  );
};

AddCouponDialog.propTypes = {
  selectRows: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
