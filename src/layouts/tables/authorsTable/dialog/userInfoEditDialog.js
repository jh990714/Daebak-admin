import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export const UserInfoEditDialog = ({ rowData, setRowData, isOpen, onClose }) => {
  const [editedData, setEditedData] = useState({
    id: rowData.id,
    memberId: rowData.author.id,
    name: rowData.author.name,
    email: rowData.email,
    phone: rowData.phone,
    address: rowData.address,
    points: rowData.points,
    coupons: rowData.coupons,
    employed: rowData.employed,
  });

  useEffect(() => {
    setEditedData({
      id: rowData.id,
      memberId: rowData.author.id,
      name: rowData.author.name,
      email: rowData.email,
      phone: rowData.phone,
      address: rowData.address,
      points: rowData.points,
      coupons: rowData.coupons,
      employed: rowData.employed,
    });
  }, [rowData]);

  const columns = [
    { field: "memberId", headerName: "ID", width: 150, editable: false },
    { field: "name", headerName: "이름", width: 150, editable: true },
    { field: "email", headerName: "이메일", width: 200, editable: true },
    { field: "phone", headerName: "휴대폰 번호", width: 150, editable: true },
    { field: "address", headerName: "기본 배송지", width: 300, editable: true },
    { field: "points", headerName: "적립금", width: 100, editable: true },
    { field: "coupons", headerName: "쿠폰", width: 100, editable: true },
    { field: "employed", headerName: "가입 일자", width: 150, editable: false },
  ];

  const handleCellEditCommit = (params) => {
    console.log(params);
    const { field, value } = params;
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    console.log(editedData);
    setRowData((row) =>
      row.id === editedData.id
        ? { ...row, author: { id: editedData.memberId, name: editedData.name }, ...editedData }
        : row
    );
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
            bgColor="success"
            borderRadius="lg"
            coloredShadow="success"
          >
            <MDTypography variant="h6" color="white">
              사용자 정보
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataGrid
              rows={[editedData]}
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

UserInfoEditDialog.propTypes = {
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

UserInfoEditDialog.defaultProps = {
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
