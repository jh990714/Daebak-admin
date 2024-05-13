import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Autocomplete, TextField, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";

import DataTable from "examples/Tables/DataTable";

export const CouponDialog = ({ rowData, setRowData, isOpen, onClose }) => {
  const [data, setData] = useState(rowData);
  const dataColumns = [
    { Header: "쿠폰코드", accessor: "couponCode", align: "left" },
    { Header: "쿠폰이름", accessor: "couponName", align: "left" },
    { Header: "할인가격", accessor: "discount", align: "left" },
    { Header: "시작날짜", accessor: "validFrom", align: "center" },
    { Header: "종료날짜", accessor: "validUntil", align: "center" },
    { Header: "최소주문금액", accessor: "minPurchaseAmount", align: "center" },
    { Header: "사용기간", accessor: "expirationPeriod", align: "center" },
  ];

  useEffect(() => {
    setData(rowData);
  }, [rowData]);

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleSubmit = () => {
    console.log(data);

    setRowData(data);
    onClose();
  };
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={"xl"}>
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
              쿠폰 정보
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              table={{
                columns: dataColumns,
                rows: [
                  {
                    couponCode: (
                      <MDInput
                        type="text"
                        label="쿠폰코드"
                        value={data.couponCode}
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            couponCode: e.target.value,
                          }));
                        }}
                      />
                    ),
                    couponName: (
                      <MDInput
                        type="text"
                        label="쿠폰이름"
                        value={data.couponName}
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            couponName: e.target.value,
                          }));
                        }}
                      />
                    ),
                    discount: (
                      <MDInput
                        type="number"
                        label="할인가격"
                        value={data.discount}
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            discount: e.target.value,
                          }));
                        }}
                      />
                    ),
                    validFrom: (
                      <MDInput
                        type="date"
                        label="시작날짜"
                        value={data.validFrom}
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            validFrom: e.target.value,
                          }));
                        }}
                      />
                    ),
                    validUntil: (
                      <MDInput
                        type="date"
                        label="종료날짜"
                        value={data.validUntil}
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            validUntil: e.target.value,
                          }));
                        }}
                      />
                    ),
                    minPurchaseAmount: (
                      <MDInput
                        type="number"
                        label="최소주문금액"
                        value={data.minPurchaseAmount}
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            minPurchaseAmount: e.target.value,
                          }));
                        }}
                      />
                    ),
                    expirationPeriod: (
                      <MDInput
                        type="number"
                        label="사용기간"
                        value={data.expirationPeriod}
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            expirationPeriod: e.target.value,
                          }));
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
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

CouponDialog.propTypes = {
  rowData: PropTypes.shape({
    couponCode: PropTypes.string.isRequired,
    couponName: PropTypes.string.isRequired,
    discount: PropTypes.number.isRequired,
    validFrom: PropTypes.string.isRequired,
    validUntil: PropTypes.string.isRequired,
    minPurchaseAmount: PropTypes.number.isRequired,
    expirationPeriod: PropTypes.number.isRequired,
  }),
  setRowData: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

CouponDialog.defaultProps = {
  rowData: {
    couponCode: " ",
    couponName: " ",
    discount: 0,
    validFrom: 0,
    validUntil: 0,
    minPurchaseAmount: 0,
    expirationPeriod: 0,
  },
  setRowData: () => {},
};
