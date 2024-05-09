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
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const datas = [
    {
      productName: "국내산 고등어(중대)10팩(120~140gx10팩) ",
      dealPrice: 50,
      startDate: "2024-04-14 10:00:00",
      endDate: "2024-05-03 17:00:00",
    },
    {
      productName: "국내 ",
      dealPrice: 100,
      startDate: "2024-04-14 10:00:00",
      endDate: "2024-05-03 17:00:00",
    },
    {
      productName: "국내 ",
      dealPrice: 100,
      startDate: "2024-04-14 10:00:00",
      endDate: "2024-05-03 17:00:00",
    },
  ];

  const [rowData, setRowData] = useState(datas[0]); // 수정할 행의 데이터
  const [editDialogs, setEditDialogs] = useState(Array(datas.length).fill(false));

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

  const Product = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const dataColumns = [
    { Header: "상품", accessor: "product", width: "15%", align: "left" },
    { Header: "추가 할인", accessor: "dealPrice", align: "right" },
    { Header: "시작 시간", accessor: "startDate", align: "center" },
    { Header: "종료 시간", accessor: "endDate", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  return {
    columns: dataColumns,

    rows: datas.map((data, index) => ({
      product: <Product image={LogoAsana} name={data.productName} />,
      dealPrice: [data.dealPrice],
      startDate: [data.startDate],
      endDate: [data.endDate],
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
            <MenuItem onClick={handleEdit}>수정</MenuItem>
            <MenuItem onClick={handleDelete}>삭제</MenuItem>
          </Menu>
          <Dialog
            open={editDialogs[index]}
            onClose={handleEditDialogClose}
            fullWidth={true}
            maxWidth={"xl"}
          >
            <DialogTitle>행 수정</DialogTitle>
            <DialogContent>
              {data && (
                <Card>
                  <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="error"
                    borderRadius="lg"
                    coloredShadow="error"
                  >
                    <MDTypography variant="h6" color="white">
                      타임 특가 상품
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={3}>
                    <DataTable
                      table={{
                        columns: dataColumns,
                        rows: [
                          {
                            product: (
                              <MDInput
                                type="text"
                                label="상품명"
                                value={rowData.productName}
                                onChange={(e) => {
                                  const newData = { ...rowData, productName: e.target.value };
                                  setRowData(newData);
                                }}
                              />
                            ),
                            dealPrice: (
                              <MDInput
                                type="number"
                                label="추가할인"
                                value={rowData.dealPrice}
                                onChange={(e) => {
                                  const newData = { ...rowData, dealPrice: e.target.value };
                                  setRowData(newData);
                                }}
                              />
                            ),
                            startDate: (
                              <MDInput
                                type="datetime"
                                label="시작 시간"
                                value={rowData.startDate}
                                onChange={(e) => {
                                  const newData = { ...rowData, startDate: e.target.value };
                                  setRowData(newData);
                                }}
                              />
                            ),
                            endDate: (
                              <MDInput
                                type="datetime"
                                label="종료 시간"
                                value={rowData.endDate}
                                onChange={(e) => {
                                  const newData = { ...rowData, endDate: e.target.value };
                                  setRowData(newData);
                                }}
                              />
                            ),
                          },
                        ],
                      }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                    />
                  </MDBox>
                </Card>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditDialogClose}>취소</Button>
              <Button onClick={handleEditDialogSubmit}>저장</Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    })),
  };
}
