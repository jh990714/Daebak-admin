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
import EditNoteIcon from "@mui/icons-material/EditNote";

import { useState } from "react";
import { ReviewResponseDialog } from "../dialog/reviewResponseDialog";

const expandedContent = (rowData) => {
  const handleEditNoteIconClick = () => {
    console.log("ggg");
  };
  return (
    <>
      <ul className="mb-4 p-2 overflow-y-auto max-h-60 gap-y-2">
        {rowData.response.map((res, index) => (
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
      reviewId: 1,
      productId: 1,
      productName: "국내산 고등어(중대)10팩(120~140gx10팩) ",
      optionId: 34,
      optionName: "고급 포장",
      memberId: 1,
      memberName: "이광득",
      imgUrl: ["1.jpg", "2.jpg"],
      contents:
        "고등어가 정말 크기도 적당하고 신선한 맛이 너무 좋아요. 요리하기에도 딱 좋은 사이즈입니다. 제가 이렇게 좋은 고등어를 이 가격에 구매할 수 있다니 정말 감사해요. 이렇게 맛있는 고등어를 제공해주셔서 정말 감사합니다. 포장도 꼼꼼하게 되어 있어서 안심하고 구매할 수 있었습니다. 또한 배송이 정말 빠르고 안전하게 도착했습니다. 다음에도 또 구매할 거예요. 정말 만족스럽습니다.별 ⭐️⭐️⭐️⭐️⭐️ 다섯개 추천합니다!!^^",
      score: 2,
      reviewDate: "2024-04-06 19:07:48",
      isBest: 1,
      orderNumber: 0,
      response: [
        {
          responseId: 1,
          adminId: 1,
          responseText: "감사합니다.",
          responseDate: "2024-04-07 00:00:00",
        },
        {
          responseId: 2,
          adminId: 1,
          responseText: "고맙습니다.",
          responseDate: "2024-04-07 00:00:01",
        },
      ],
    },
    {
      reviewId: 2,
      productId: 1,
      productName: "국내산 고등어(중대)10팩(120~140gx10팩) ",
      optionId: 34,
      optionName: "고급 포장",
      memberId: 1,
      memberName: "이광득",
      imgUrl: [],
      contents:
        "요리하기에도 딱 좋은 사이즈입니다. \n제가 이렇게 좋은 고등어를 이 가격에 구매할 수 있다니 정말 감사해요. \n이렇게 맛있는 고등어를 제공해주셔서 정말 감사합니다. \n포장도 꼼꼼하게 되어 있어서 안심하고 구매할 수 있었습니다. \n또한 배송이 정말 빠르고 안전하게 도착했습니다. \n다음에도 또 구매할 거예요. \n정말 만족스럽습니다. \n별 ⭐️⭐️⭐️⭐️⭐️ 다섯개 추천합니다!!^^",
      score: 2,
      reviewDate: "2024-04-06 19:07:48",
      isBest: 0,
      orderNumber: 0,
      response: [],
    },
    {
      reviewId: 3,
      productId: 1,
      productName: "답변 완료된 리뷰 테스트 ",
      optionId: 34,
      optionName: "고급 포장",
      memberId: 1,
      memberName: "테스터",
      imgUrl: ["1.jpg", "2.jpg"],
      contents: "답변이 완료된 리뷰입니다. 테스트 1",
      score: 5,
      reviewDate: "2024-04-06 00:00:00",
      isBest: 1,
      orderNumber: 0,
      response: [
        {
          responseId: 4,
          adminId: 1,
          responseText: "테스터의 답변 1.",
          responseDate: "2024-04-07 00:00:00",
        },
        {
          responseId: 5,
          adminId: 1,
          responseText: "테스터의 답변 2.",
          responseDate: "2024-04-07 00:00:01",
        },
      ],
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
    { Header: "옵션명", accessor: "optionName", align: "center" },
    {
      Header: "리뷰",
      accessor: "contents",
      align: "center",
      Cell: ({ cell: { value } }) => <ExpandableText text={value} maxLength={32} />,
    },
    { Header: "별점", accessor: "score", align: "center" },
    { Header: "작성일", accessor: "reviewDate", align: "center" },
    { Header: "Best", accessor: "isBest", align: "center" },
    { Header: "orderNumber", accessor: "orderNumber", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const transformDataForReview = (datas) => {
    return datas.map((data, index) => ({
      memberName: data.memberName,
      productName: data.productName,
      optionName: data.optionName,
      contents: data.contents,
      score: data.score,
      reviewDate: new Date(data.reviewDate).toLocaleString(),
      isBest: data.isBest,
      orderNumber: data.orderNumber,
      response: data.response,
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
            <MenuItem onClick={handleClose}>상세 정보</MenuItem>
            <MenuItem onClick={handleClose}>
              {rowData.isBest ? "Best 리뷰 해제" : "Best 리뷰 등록"}
            </MenuItem>
          </Menu>
          <ReviewResponseDialog
            rowData={rowData}
            setRowData={setRowData}
            isOpen={dialogs[index] && dialogType === "response"}
            onClose={handleDialogClose}
          />
        </>
      ),
    }));
  };

  const transformedData = transformDataForReview(datas);

  const { completedReview, missingReview } = transformedData.reduce(
    (acc, data) => {
      if (data.response.length > 0) {
        acc.completedReview.push(data);
      } else {
        acc.missingReview.push(data);
      }
      return acc;
    },
    { completedReview: [], missingReview: [] }
  );

  return {
    columns: dataColumns,

    rows: completedReview,

    missingColumns: dataColumns,

    missingRows: missingReview,

    expanded: expandedContent,
  };
}
