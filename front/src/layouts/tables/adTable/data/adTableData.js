import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { AdEditDialog } from "../dialog/adEditDialog";
import { fetchDeleteAd } from "reducers/slices/adSlice";

export const adTableData = () => {
  const dispatch = useDispatch();
  const { ads } = useSelector((state) => state.ads);
  const [rowData, setRowData] = useState(ads[0]);
  const [dialogAnchorEl, setDialogAnchorEl] = useState(0);
  const [anchorEls, setAnchorEls] = useState(Array(ads.length).fill(null));
  const [dialogs, setDialogs] = useState(Array(ads.length).fill(false));
  const [dialogType, setDialogType] = useState(null);

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
    setDialogAnchorEl(index);

    setRowData(ads[index]);
  };

  const handleClose = () => {
    setAnchorEls(Array(ads.length).fill(null));
  };

  const handleDialog = (type) => {
    setDialogType(type);
    setDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: true,
    }));
    handleClose();
  };

  const handleDialogClose = () => {
    setDialogType(null);
    setDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: false,
    }));
    setDialogAnchorEl(null);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(`해당 팝업을 정말로 삭제하시겠습니까?`);
    if (confirmDelete) {
      dispatch(fetchDeleteAd(rowData.adId))
        .then(() => {
          console.log("저장 성공");
        })
        .catch((error) => {
          console.error("저장 실패:", error);
        });
    }
  };

  const dataColumns = [
    { Header: "이미지", accessor: "image", align: "left" },
    { Header: "시작시간", accessor: "startDate", align: "left" },
    { Header: "종료시간", accessor: "endDate", align: "left" },
    { Header: "action", accessor: "action", align: "left" },
  ];

  const dataRows = ads.map((data, index) => ({
    image: (
      <>
        <div style={{ maxWidth: "500px" }}>
          <img src={data.imageUrl} style={{ maxWidth: "100%" }} />
        </div>
        {data.linkUrl && (
          <TextField margin="dense" label="링크" fullWidth value={data.linkUrl} readOnly />
        )}
      </>
    ),
    startDate: (
      <>
        {/* 시작시간을 표시 */}
        <TextField margin="dense" label="시작시간" value={data.startDate} readOnly fullWidth />
      </>
    ),
    endDate: (
      <>
        {/* 종료시간을 표시 */}
        <TextField margin="dense" label="종료시간" value={data.endDate} readOnly fullWidth />
      </>
    ),
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
          <MenuItem onClick={() => handleDialog("edit")}>수정</MenuItem>
          <MenuItem onClick={handleDelete}>삭제</MenuItem>
        </Menu>

        {dialogType === "edit" && dialogs[index] && rowData && (
          <AdEditDialog
            rowData={rowData}
            isOpen={dialogType === "edit" && dialogs[index]}
            onClose={handleDialogClose}
          />
        )}
      </>
    ),
  }));

  return {
    dataColumns,
    dataRows,
  };
};
