import React, { useState } from "react";

import { IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { CouponDialog } from "../../../couponAdd";

export const couponTableData = () => {
  const datas = [
    {
      couponId: 1,
      couponCode: "COUPON001",
      couponName: "첫 구매 할인",
      discount: 1000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 10000,
      expirationPeriod: null,
    },
    {
      couponId: 2,
      couponCode: "COUPON002",
      couponName: "이벤트 할인",
      discount: 2000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 0,
      expirationPeriod: 1,
    },
    {
      couponId: 3,
      couponCode: "COUPON001",
      couponName: "첫 구매 할인",
      discount: 1000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 10000,
      expirationPeriod: null,
    },
    {
      couponId: 4,
      couponCode: "COUPON002",
      couponName: "이벤트 할인",
      discount: 2000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 0,
      expirationPeriod: 1,
    },
    {
      couponId: 5,
      couponCode: "COUPON001",
      couponName: "첫 구매 할인",
      discount: 1000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 10000,
      expirationPeriod: null,
    },
    {
      couponId: 6,
      couponCode: "COUPON002",
      couponName: "이벤트 할인",
      discount: 2000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 0,
      expirationPeriod: 1,
    },
    {
      couponId: 7,
      couponCode: "COUPON001",
      couponName: "첫 구매 할인",
      discount: 1000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 10000,
      expirationPeriod: null,
    },
    {
      couponId: 8,
      couponCode: "COUPON002",
      couponName: "이벤트 할인",
      discount: 2000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 0,
      expirationPeriod: 1,
    },
    {
      couponId: 9,
      couponCode: "COUPON001",
      couponName: "첫 구매 할인",
      discount: 1000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 10000,
      expirationPeriod: null,
    },
    {
      couponId: 10,
      couponCode: "COUPON002",
      couponName: "이벤트 할인",
      discount: 2000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 0,
      expirationPeriod: 1,
    },
    {
      couponId: 11,
      couponCode: "COUPON001",
      couponName: "첫 구매 할인",
      discount: 1000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 10000,
      expirationPeriod: null,
    },
    {
      couponId: 12,
      couponCode: "COUPON002",
      couponName: "이벤트 할인",
      discount: 2000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 0,
      expirationPeriod: 1,
    },
    {
      couponId: 13,
      couponCode: "COUPON001",
      couponName: "첫 구매 할인",
      discount: 1000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 10000,
      expirationPeriod: null,
    },
    {
      couponId: 14,
      couponCode: "COUPON002",
      couponName: "이벤트 할인",
      discount: 2000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 0,
      expirationPeriod: 1,
    },
    {
      couponId: 15,
      couponCode: "COUPON001",
      couponName: "첫 구매 할인",
      discount: 1000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 10000,
      expirationPeriod: null,
    },
    {
      couponId: 16,
      couponCode: "COUPON002",
      couponName: "이벤트 할인",
      discount: 2000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 0,
      expirationPeriod: 1,
    },
    {
      couponId: 17,
      couponCode: "COUPON001",
      couponName: "첫 구매 할인",
      discount: 1000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 10000,
      expirationPeriod: null,
    },
    {
      couponId: 18,
      couponCode: "COUPON002",
      couponName: "이벤트 할인",
      discount: 2000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 0,
      expirationPeriod: 1,
    },
    {
      couponId: 19,
      couponCode: "COUPON001",
      couponName: "첫 구매 할인",
      discount: 1000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 10000,
      expirationPeriod: null,
    },
    {
      couponId: 20,
      couponCode: "COUPON002",
      couponName: "이벤트 할인",
      discount: 2000,
      validFrom: "2024-04-22",
      validUntil: "2024-05-22",
      minPurchaseAmount: 0,
      expirationPeriod: 1,
    },
  ];

  const [rowData, setRowData] = useState(datas[0]);
  const [dialogAnchorEl, setDialogAnchorEl] = useState(0);
  const [anchorEls, setAnchorEls] = useState(Array(datas.length).fill(null));
  const [editDialogs, setEditDialogs] = useState(Array(datas.length).fill(false));
  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
    setDialogAnchorEl(index);

    setRowData(datas[index]);
  };

  const handleClose = (index) => {
    setAnchorEls(Array(datas.length).fill(null));
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
    { Header: "최소주문금액", accessor: "minPurchaseAmount", align: "center" },
    { Header: "사용기간", accessor: "expirationPeriod", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const dataRows = datas.map((data, index) => ({
    couponCode: data.couponCode,
    couponName: data.couponName,
    discount: `${data.discount.toLocaleString()}원`,
    validFrom: data.validFrom,
    validUntil: data.validUntil,
    minPurchaseAmount: `${data.minPurchaseAmount.toLocaleString()}원`,
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
