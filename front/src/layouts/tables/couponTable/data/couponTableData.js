import React, { useState } from "react";

import { IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { CouponDialog } from "../../../couponAdd";
import couponDatas from "./couponDatas";
import { useSelector } from "react-redux";

export const couponTableData = () => {
  const { coupons } = useSelector((state) => state.coupons);
  console.log("쿠폰 응답: ", coupons);
  // const datas = couponDatas;
  const [rowData, setRowData] = useState(coupons[0]);
  const [dialogAnchorEl, setDialogAnchorEl] = useState(0);
  const [anchorEls, setAnchorEls] = useState(Array(coupons.length).fill(null));
  const [editDialogs, setEditDialogs] = useState(Array(coupons.length).fill(false));
  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
    setDialogAnchorEl(index);

    setRowData(coupons[index]);
  };

  const handleClose = (index) => {
    setAnchorEls(Array(coupons.length).fill(null));
  };

  const handleEdit = () => {
    setEditDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: true,
    }));
    handleClose();
  };

  const handleEditDialogClose = () => {
    setEditDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: false,
    }));
    setDialogAnchorEl(null);
  };

  const handleEditDialogSubmit = () => {
    // 수정 동작을 수행하는 함수 호출
    console.log("Edit submitted:", rowData);
    setEditDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: false,
    }));
    setDialogAnchorEl(null);
  };

  const dataColumns = [
    { Header: "쿠폰코드", accessor: "couponCode", align: "left" },
    { Header: "쿠폰이름", accessor: "couponName", align: "left" },
    { Header: "할인가격", accessor: "discount", align: "left" },
    { Header: "시작날짜", accessor: "validFrom", align: "center" },
    { Header: "종료날짜", accessor: "validUntil", align: "center" },
    { Header: "최소주문금액", accessor: "minimumOrderAmount", align: "center" },
    { Header: "사용기간", accessor: "expirationPeriod", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const dataRows = coupons.map((data, index) => ({
    couponCode: data.couponCode,
    couponName: data.couponName,
    discount: `${data.discount.toLocaleString()}원`,
    validFrom: data.validFrom,
    validUntil: data.validUntil,
    minimumOrderAmount: `${data.minimumOrderAmount.toLocaleString()}원`,
    expirationPeriod: data.expirationPeriod,
    action: (
      <>
        <IconButton
          aria-label="more"
          onClick={(e) => {
            handleClick(e, index);
          }}
        >
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEls[index]} open={Boolean(anchorEls[index])} onClose={handleClose}>
          <MenuItem onClick={handleEdit}>수정</MenuItem>
          <MenuItem onClick={handleClose}>삭제</MenuItem>
        </Menu>
        <CouponDialog
          rowData={rowData}
          setRowData={setRowData}
          isOpen={editDialogs[index]}
          onClose={handleEditDialogClose}
        />
      </>
    ),
  }));

  return {
    columns: dataColumns,
    rows: dataRows,
  };
};
