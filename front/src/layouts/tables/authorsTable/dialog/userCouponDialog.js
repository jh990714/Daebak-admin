import { useState } from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import userCouponData from "../data/userCouponData";
import TextField from "@mui/material/TextField";

export const UserCouponDialog = ({ rowData, setRowData, isOpen, onClose }) => {
  const [myCoupons, setMyCoupons] = useState(userCouponData);

  const handleDateChange = (e, id, field) => {
    console.log(e.target.value);
    const updatedCoupons = myCoupons.map((coupon) =>
      coupon.id === id ? { ...coupon, [field]: e.target.value } : coupon
    );
    setMyCoupons(updatedCoupons);
  };
  console.log("userCouponDialog", rowData);
  const columns = [
    { field: "couponName", headerName: "쿠폰명", width: 150, editable: false },
    { field: "discount", headerName: "할인가격", width: 150, editable: false },
    {
      field: "issueDate",
      headerName: "시작날짜",
      width: 300,
      editable: true,
      renderCell: (params) => (
        <TextField
          type="datetime-local"
          value={params.value}
          onChange={(e) => handleDateChange(e, params.row.id, "issueDate")}
          InputLabelProps={{
            shrink: true,
          }}
        />
      ),
    },
    {
      field: "validUntil",
      headerName: "종료날짜",
      width: 300,
      editable: true,
      renderCell: (params) => (
        <TextField
          type="datetime-local"
          value={params.value}
          onChange={(e) => handleDateChange(e, params.row.id, "validUntil")}
          InputLabelProps={{
            shrink: true,
          }}
        />
      ),
    },
    { field: "minimumOrderAmount", headerName: "최소주문금액", width: 150, editable: false },
  ];

  const handleCellEditCommit = (params) => {
    console.log(params);
    const { id, field, value } = params;
    setMyCoupons((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSaveChanges = () => {
    console.log(rowData, myCoupons);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth={"xl"}>
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
              보유 쿠폰
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataGrid
              rows={myCoupons}
              columns={columns}
              pagination={false}
              pageSizeOptions={[]}
              processRowUpdate={handleCellEditCommit}
              disableRowSelectionOnClick
            />
          </MDBox>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSaveChanges}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

UserCouponDialog.propTypes = {
  rowData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
    coupons: PropTypes.string.isRequired,
    employed: PropTypes.string.isRequired,
  }),
  setRowData: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

UserCouponDialog.defaultProps = {
  rowData: {
    id: null,
    author: { name: "", id: "" },
    email: "",
    phone: "",
    address: "",
    points: "",
    coupons: "",
    employed: "",
  },
  setRowData: () => {},
};
