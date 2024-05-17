/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import React, { useState } from "react";
import Icon from "@mui/material/Icon";

import { Menu, MenuItem, IconButton, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

import EditNoteIcon from "@mui/icons-material/EditNote";
import { ResponseDialog } from "./dialog/responseDialog";

const expandedContent = (rowData) => {
  const handleEditNoteIconClick = () => {
    console.log("adf");
  };

  return (
    <>
      <ul className="mb-4 p-2 overflow-y-auto max-h-60 gap-y-2">
        {rowData.answer.map((res, index) => (
          <li key={index} className="flex mb-4 gap-4">
            ⤷
            <MDTypography width={"100%"} display="flex" flexDirection="column">
              <span className="text-sm">{new Date(res.responseDate).toLocaleString()} </span>
              <MDInput
                value={res.responseText}
                multiline
                rows={3}
                fullWidth
                maxWidth={"xl"}
                readOnly
              />
            </MDTypography>
          </li>
        ))}
      </ul>
      <div className="flex gap-4 p-2 border-y">
        ⤷
        <MDInput label={"답변작성"} multiline rows={3} fullWidth={true} maxWidth={"xl"} />
        <IconButton aria-label="send response" onClick={handleEditNoteIconClick}>
          <EditNoteIcon />
        </IconButton>
      </div>
    </>
  );
};

export default function data() {
  const datas = [
    {
      question: {
        questionId: 11,
        question: "질문할게요",
        createdAt: "2024-05-05T16:21:36.000+00:00",
        name: "테*트",
      },
      answer: [
        {
          answerId: 4,
          responseText: "답변입니다.1",
          responseDate: "2024-05-05T16:22:00.000+00:00",
        },
        {
          answerId: 5,
          responseText: "답변입니다.2",
          responseDate: "2024-05-05T16:22:00.000+00:00",
        },
      ],
    },
    {
      question: {
        questionId: 12,
        question: "새로운 질문입니다.",
        createdAt: "2024-05-06T10:30:00.000+00:00",
        name: "또*다",
      },
      answer: [],
    },
  ];

  const [rowData, setRowData] = useState(datas[0]);
  const [dialogAnchorEl, setDialogAnchorEl] = useState(0);
  const [anchorEls, setAnchorEls] = useState(Array(datas.length).fill(null));
  const [dialogs, setDialogs] = useState(Array(datas.length).fill(false));
  const [dialogType, setDialogType] = useState(null);

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
    setDialogAnchorEl(index);

    setRowData(datas[index]);
  };

  const handleClose = () => {
    setAnchorEls(Array(datas.length).fill(null));
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

  const ExpandableText = ({ text, maxLength }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div>
        <span className={`flex ${expanded ? "flex-wrap max-w-96" : ""} text-left`}>
          {expanded ? text : text.length > maxLength ? text.slice(0, maxLength) + "..." : text}
        </span>
        {text.length > maxLength && (
          <button className="text-blue-500" onClick={() => setExpanded(!expanded)}>
            {expanded ? "간략히 보기" : "더 보기"}
          </button>
        )}
      </div>
    );
  };
  const dataColumns = [
    { Header: "작성자", accessor: "memberName", align: "left" },
    { Header: "상품명", accessor: "productName", align: "left" },
    {
      Header: "질문",
      accessor: "question",
      align: "center",
      Cell: ({ cell: { value } }) => <ExpandableText text={value} maxLength={32} />,
    },
    { Header: "작성일", accessor: "qnaDate", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const transformDataForQna = (datas) => {
    return datas.map((data, index) => ({
      memberName: data.question.name,
      question: data.question.question,
      qnaDate: new Date(data.question.createdAt).toLocaleString(),
      answer: data.answer,
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
            <MenuItem
              onClick={() => {
                handleDialog("response");
              }}
            >
              답변 달기
            </MenuItem>
            <MenuItem>상세 정보</MenuItem>
          </Menu>
          <ResponseDialog
            rowData={rowData}
            setRowData={setRowData}
            isOpen={dialogs[index] && dialogType === "response"}
            onClose={handleDialogClose}
          />
        </>
      ),
    }));
  };

  const transformedData = transformDataForQna(datas);

  const { completedQna, missingQna } = transformedData.reduce(
    (acc, data) => {
      if (data.answer.length > 0) {
        acc.completedQna.push(data);
      } else {
        acc.missingQna.push(data);
      }
      return acc;
    },
    { completedQna: [], missingQna: [] }
  );

  return {
    columns: dataColumns,

    rows: completedQna,

    missingColumns: dataColumns,

    missingRows: missingQna,

    expanded: expandedContent,
  };
}
