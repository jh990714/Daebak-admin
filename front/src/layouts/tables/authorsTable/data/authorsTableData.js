import { useState } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import team2 from "assets/images/team-2.jpg";
import { UserInfoEditDialog } from "../dialog/userInfoEditDialog";
import { UserCouponDialog } from "../dialog/userCouponDialog";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

export default function authorsTableData() {
  const { members } = useSelector((state) => state.members);

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

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [dialogType, setDialogType] = useState(null);

  const handleMenuClick = (event, row) => {
    setCurrentRow(row);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setDialogType(null);
    setAnchorEl(null);
    setCurrentRow(null);
  };

  const handleEdit = () => {
    setDialogType("edit");
  };

  const handleShowCoupons = () => {
    setDialogType("coupon");
  };

  const handleDelete = () => {
    console.log(`Delete ${currentRow.id}`);
  };

  const closeDialog = () => {
    handleMenuClose();
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
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl && currentRow?.id === params.row.id)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEdit()}>수정</MenuItem>
            <MenuItem onClick={handleShowCoupons}>보유 쿠폰</MenuItem>
            <MenuItem onClick={handleDelete}>삭제</MenuItem>
          </Menu>

          {dialogType === "edit" && currentRow?.id === params.row.id && (
            <UserInfoEditDialog
              rowData={currentRow}
              setRowData={setCurrentRow}
              isOpen={Boolean(dialogType === "edit")}
              onClose={closeDialog}
            />
          )}
          {dialogType === "coupon" && currentRow?.id === params.row.id && (
            <UserCouponDialog
              rowData={currentRow}
              setRowData={setCurrentRow}
              isOpen={Boolean(dialogType === "coupon")}
              onClose={closeDialog}
            />
          )}
        </>
      ),
    },
  ];

  const rows = members;
  console.log(currentRow);
  return {
    columns,
    rows,
  };
}
