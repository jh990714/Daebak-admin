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
      id: "2",
      productId: 1,
      productName: "국내산 고등어(중대)10팩(120~140gx10팩) ",
      optionId: 34,
      optionName: "고급 포장",
      memberId: 1,
      memberName: "이광득",
      contents:
        "고등어가 정말 크기도 적당하고 신선한 맛이 너무 좋아요. 요리하기에도 딱 좋은 사이즈입니다. 제가 이렇게 좋은 고등어를 이 가격에 구매할 수 있다니 정말 감사해요. 이렇게 맛있는 고등어를 제공해주셔서 정말 감사합니다. 포장도 꼼꼼하게 되어 있어서 안심하고 구매할 수 있었습니다. 또한 배송이 정말 빠르고 안전하게 도착했습니다. 다음에도 또 구매할 거예요. 정말 만족스럽습니다.별 ⭐️⭐️⭐️⭐️⭐️ 다섯개 추천합니다!!^^",
      score: 2,
      reviewDate: "2024-04-06 19:07:48",
      isBest: 1,
      orderNumber: 0,
    },
    {
      id: "2",
      productId: 1,
      productName: "국내산 고등어(중대)10팩(120~140gx10팩) ",
      optionId: 34,
      optionName: "고급 포장",
      memberId: 1,
      memberName: "이광득",
      contents:
        "요리하기에도 딱 좋은 사이즈입니다. 제가 이렇게 좋은 고등어를 이 가격에 구매할 수 있다니 정말 감사해요. 이렇게 맛있는 고등어를 제공해주셔서 정말 감사합니다. 포장도 꼼꼼하게 되어 있어서 안심하고 구매할 수 있었습니다. 또한 배송이 정말 빠르고 안전하게 도착했습니다. 다음에도 또 구매할 거예요. 정말 만족스럽습니다.별 ⭐️⭐️⭐️⭐️⭐️ 다섯개 추천합니다!!^^",
      score: 2,
      reviewDate: "2024-04-06 19:07:48",
      isBest: 0,
      orderNumber: 0,
    },
  ];

  const [rowData, setRowData] = useState(datas[0]); // 수정할 행의 데이터
  const [editDialogs, setEditDialogs] = useState(Array(datas.length).fill(false));
  const [responseDialogs, setResponseDialogs] = useState(Array(datas.length).fill(false));

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setDialogAnchorEl(index);
    setRowData(datas[index]);
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

  const ExpandableText = ({ text, maxLength }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div>
        <p>{expanded ? text[0] : text[0].slice(0, maxLength) + "..."}</p>
        {text[0].length > maxLength && (
          <button onClick={() => setExpanded(!expanded)}>
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
      Cell: ({ cell: { value } }) => <ExpandableText text={value} maxLength={5} />,
    },
    { Header: "별점", accessor: "score", align: "center" },
    { Header: "작성일", accessor: "reviewDate", align: "center" },
    { Header: "Best 리뷰 여부", accessor: "isBest", align: "center" },
    { Header: "orderNumber", accessor: "orderNumber", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  return {
    columns: dataColumns,

    rows: datas.map((data, index) => ({
      memberName: [data.memberName],
      productName: [data.productName],
      optionName: [data.optionName],
      contents: [data.contents],
      score: [data.score],
      reviewDate: [data.reviewDate],
      isBest: [data.isBest],
      orderNumber: [data.orderNumber],
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
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleResponse}>답변 달기</MenuItem>
            <MenuItem onClick={handleBestToggle}>
              {rowData.isBest ? "Best 리뷰 해제" : "Best 리뷰 등록"}
            </MenuItem>
            <MenuItem onClick={handleDelete}>삭제</MenuItem>
          </Menu>
          <Dialog
            open={responseDialogs[index]}
            onClose={handleResponseDialogClose}
            fullWidth={true}
            maxWidth={"xl"}
          >
            <DialogContent>
              {data && (
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
    })),
  };
}
