import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import team2 from "assets/images/team-2.jpg";
import authorsDatas from "./authorsData";
import { UserInfoEditDialog } from "../dialog/userInfoEditDialog";
import { UserCouponDialog } from "../dialog/userCouponDialog";

export default function authorsTableData() {
  const Author = ({ image, name, id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{id}</MDTypography>
      </MDBox>
    </MDBox>
  );

  Author.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  const [anchorEls, setAnchorEls] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState({});
  const [rowData, setRowData] = useState(authorsDatas[0]);
  const [couponDialogOpen, setCouponDialogOpen] = useState({});

  const handleOpenEditDialog = (id) => {
    setEditDialogOpen((prevState) => ({ ...prevState, [id]: true }));
  };

  const handleCloseEditDialog = (id) => {
    setEditDialogOpen((prevState) => ({ ...prevState, [id]: false }));
  };

  const handleOpenCouponDialog = (id) => {
    setCouponDialogOpen((prevState) => ({ ...prevState, [id]: true }));
  };

  const handleCloseCouponDialog = (id) => {
    setCouponDialogOpen((prevState) => ({ ...prevState, [id]: false }));
  };

  const handleMenuClick = (event, row) => {
    setRowData(row);
    setAnchorEls((prevState) => ({ ...prevState, [row.id]: event.currentTarget }));
  };

  const handleMenuClose = (id) => {
    setAnchorEls((prevState) => ({ ...prevState, [id]: null }));
  };

  const handleEdit = (row) => {
    handleMenuClose(row.id);
    handleOpenEditDialog(row.id);
  };

  const handleShowCoupons = (row) => {
    handleMenuClose(row.id);
    handleOpenCouponDialog(row.id);
  };

  const handleDelete = (row) => {
    console.log(`Delete ${row.id}`);
    handleMenuClose(row.id);
  };

  const columns = [
    {
      headerName: "사용자",
      field: "author",
      width: 300,
      renderCell: (params) => (
        <Author image={team2} name={params.row.author.name} id={params.row.author.id} />
      ),
    },
    {
      headerName: "이메일",
      field: "email",
      width: 250,
      renderCell: (params) => (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {params.value}
        </MDTypography>
      ),
    },
    {
      headerName: "휴대폰 번호",
      field: "phone",
      width: 150,
      renderCell: (params) => (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {params.value}
        </MDTypography>
      ),
    },
    {
      headerName: "기본 배송지",
      field: "address",
      width: 350,
      renderCell: (params) => (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {params.value}
        </MDTypography>
      ),
    },
    {
      headerName: "적립금",
      field: "points",
      width: 100,
      renderCell: (params) => (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {params.value}
        </MDTypography>
      ),
    },
    {
      headerName: "쿠폰",
      field: "coupons",
      width: 80,
      renderCell: (params) => (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {params.value}
        </MDTypography>
      ),
    },
    {
      headerName: "가입 일자",
      field: "employed",
      width: 150,
      renderCell: (params) => (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {params.value}
        </MDTypography>
      ),
    },
    {
      headerName: "Action",
      field: "action",
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="more"
            aria-controls={`menu-${params.row.id}`}
            aria-haspopup="true"
            onClick={(event) => handleMenuClick(event, params.row)}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id={`menu-${params.row.id}`}
            anchorEl={anchorEls[params.row.id]}
            keepMounted
            open={Boolean(anchorEls[params.row.id])}
            onClose={() => handleMenuClose(params.row.id)}
          >
            <MenuItem onClick={() => handleEdit(params.row)}>수정</MenuItem>
            <MenuItem onClick={() => handleShowCoupons(params)}>보유 쿠폰</MenuItem>
            <MenuItem onClick={() => handleDelete(params.row)}>삭제</MenuItem>
          </Menu>
          <UserInfoEditDialog
            rowData={rowData}
            setRowData={setRowData}
            isOpen={editDialogOpen[params.row.id]}
            onClose={() => handleCloseEditDialog(params.row.id)}
          />
          <UserCouponDialog
            rowData={rowData}
            setRowData={setRowData}
            isOpen={couponDialogOpen[params.row.id]}
            onClose={() => handleCloseCouponDialog(params.row.id)}
          />
        </>
      ),
    },
  ];

  const rows = authorsDatas;

  return { columns, rows };
}
