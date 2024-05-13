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
import React from "react";
import Icon from "@mui/material/Icon";

import { Menu, MenuItem, IconButton, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

import DataTable from "examples/Tables/DataTable";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import { useEffect, useState } from "react";

export default function data() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogAnchorEl, setDialogAnchorEl] = useState(0);

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

  const [rowData, setRowData] = useState(datas[0]); // 수정할 행의 데이터
  const [editDialogs, setEditDialogs] = useState(Array(datas.length).fill(false));
  const [responseDialogs, setResponseDialogs] = useState(Array(datas.length).fill(false));

  const handleClick = (event, index, reviewId = null) => {
    setAnchorEl(event.currentTarget);

    if (reviewId) {
      const foundIndex = datas.findIndex((data) => data.reviewId === reviewId);
      if (foundIndex !== -1) {
        setDialogAnchorEl(foundIndex);
        setRowData(datas[foundIndex]);
      } else {
        console.error("해당 상품을 찾는 것에 실패하였습니다.");
      }
    } else {
      setDialogAnchorEl(index);
      setRowData(datas[index]);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: true,
    }));
    handleClose();
  };

  const handleResponse = () => {
    setResponseDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: true,
    }));
    handleClose();
  };

  const handleBestToggle = () => {
    // datas[dialogAnchorEl].isBest = !datas[dialogAnchorEl].isBest;
    handleClose();
  };

  const handleDelete = () => {
    handleClose();
    // 삭제 동작을 수행하는 함수 호출
    console.log("Delete clicked", dialogAnchorEl);
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
    console.log("Edit submitted:");
    setEditDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: false,
    }));
    setDialogAnchorEl(null);
  };

  const handleResponseDialogClose = () => {
    setResponseDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: false,
    }));
    setDialogAnchorEl(null);
  };

  const handleResponseDialogSubmit = () => {
    // 답변 등록 동작을 수행하는 함수 호출
    console.log("Edit submitted:");
    setResponseDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: false,
    }));
    setDialogAnchorEl(null);
  };

  const formatText = (text) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
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

  const { completedQna, missingQna } = datas.reduce(
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

  const transformDataForQna = (datas) => {
    return datas.map((data, index) => ({
      memberName: data.question.name,
      productName: null,
      question: data.question.question,
      qnaDate: new Date(data.question.createdAt).toLocaleString(),
      response: data.answer,
      action: (
        <>
          <IconButton
            aria-label="more"
            onClick={(e) => {
              handleClick(e, index, data.reviewId);
            }}
          >
            <MoreVert />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleResponse}>답변 달기</MenuItem>
            <MenuItem onClick={handleBestToggle}>
              {rowData.isBest ? "Best 리뷰 해제" : "Best 리뷰 등록"}
            </MenuItem>
            <MenuItem onClick={handleDelete}>삭제</MenuItem>
          </Menu>
          <Dialog
            open={responseDialogs[dialogAnchorEl]}
            onClose={handleResponseDialogClose}
            fullWidth={true}
            maxWidth={"xl"}
          >
            <DialogContent>
              {rowData && (
                <Card>
                  <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                  >
                    <MDTypography variant="h6" color="white">
                      관리자 답변 등록
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={3}>
                    <MDTypography variant="h6" m={2}>
                      {rowData.contents}
                    </MDTypography>
                    <MDInput
                      label="관리자 답변"
                      multiline
                      rows={5}
                      fullWidth={true}
                      maxWidth={"xl"}
                    />
                  </MDBox>
                </Card>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleResponseDialogClose}>취소</Button>
              <Button onClick={handleResponseDialogSubmit}>등록</Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    }));
  };

  return {
    columns: dataColumns,

    rows: transformDataForQna(completedQna),

    missingColumns: dataColumns,

    missingRows: transformDataForQna(missingQna),
  };
}
