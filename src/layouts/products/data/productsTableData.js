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
      productId: 1,
      productName: "국내산 고등어(중대)10팩(120~140gx10팩) ",
      regularPrice: 100,
      salePrice: 0,
      description: "NULL",
      stockQuantity: 45,
      recommended: 0,
      maxQuantityPerDelivery: 3,
    },
    {
      productId: 5,
      productName: "구운 뼈 고등어 1팩 (180g) ",
      regularPrice: 3000,
      salePrice: 150,
      description: "바로 구워 전자렌지1분 간편생선",
      stockQuantity: 0,
      recommended: 0,
      maxQuantityPerDelivery: 30,
    },
    {
      productId: 23,
      productName: "손질 참돔 3미 ",
      regularPrice: 47000,
      salePrice: 2000,
      description: "(400g내외x3팩)",
      stockQuantity: 23,
      recommended: 0,
      maxQuantityPerDelivery: 10,
    },
    {
      productId: 1,
      productName: "국내산 고등어(중대)10팩(120~140gx10팩) ",
      regularPrice: 100,
      salePrice: 0,
      description: "NULL",
      stockQuantity: 3000,
      recommended: 0,
      maxQuantityPerDelivery: 3,
    },
    {
      productId: 5,
      productName: "구운 뼈 고등어 1팩 (180g) ",
      regularPrice: 3000,
      salePrice: 150,
      description: "바로 구워 전자렌지1분 간편생선",
      stockQuantity: 0,
      recommended: 0,
      maxQuantityPerDelivery: 30,
    },
    {
      productId: 23,
      productName: "손질 참돔 3미 ",
      regularPrice: 47000,
      salePrice: 2000,
      description: "(400g내외x3팩)",
      stockQuantity: 49,
      recommended: 0,
      maxQuantityPerDelivery: 10,
    },
    {
      productId: 1,
      productName: "국내산 고등어(중대)10팩(120~140gx10팩) ",
      regularPrice: 100,
      salePrice: 0,
      description: "NULL",
      stockQuantity: 57,
      recommended: 0,
      maxQuantityPerDelivery: 3,
    },
    {
      productId: 5,
      productName: "구운 뼈 고등어 1팩 (180g) ",
      regularPrice: 3000,
      salePrice: 150,
      description: "바로 구워 전자렌지1분 간편생선",
      stockQuantity: 0,
      recommended: 0,
      maxQuantityPerDelivery: 30,
    },
    {
      productId: 23,
      productName: "손질 참돔 3미 ",
      regularPrice: 47000,
      salePrice: 2000,
      description: "(400g내외x3팩)",
      stockQuantity: 49,
      recommended: 0,
      maxQuantityPerDelivery: 10,
    },
    {
      productId: 1,
      productName: "국내산 고등어(중대)10팩(120~140gx10팩) ",
      regularPrice: 100,
      salePrice: 0,
      description: "NULL",
      stockQuantity: 57,
      recommended: 0,
      maxQuantityPerDelivery: 3,
    },
    {
      productId: 5,
      productName: "구운 뼈 고등어 1팩 (180g) ",
      regularPrice: 3000,
      salePrice: 150,
      description: "바로 구워 전자렌지1분 간편생선",
      stockQuantity: 0,
      recommended: 0,
      maxQuantityPerDelivery: 30,
    },
    {
      productId: 23,
      productName: "손질 참돔 3미 ",
      regularPrice: 47000,
      salePrice: 2000,
      description: "(400g내외x3팩)",
      stockQuantity: 49,
      recommended: 0,
      maxQuantityPerDelivery: 10,
    },
    {
      productId: 1,
      productName: "국내산 고등어(중대)10팩(120~140gx10팩) ",
      regularPrice: 100,
      salePrice: 0,
      description: "NULL",
      stockQuantity: 57,
      recommended: 0,
      maxQuantityPerDelivery: 3,
    },
    {
      productId: 5,
      productName: "구운 뼈 고등어 1팩 (180g) ",
      regularPrice: 3000,
      salePrice: 150,
      description: "바로 구워 전자렌지1분 간편생선",
      stockQuantity: 0,
      recommended: 0,
      maxQuantityPerDelivery: 30,
    },
    {
      productId: 23,
      productName: "손질 참돔 3미 ",
      regularPrice: 47000,
      salePrice: 2000,
      description: "(400g내외x3팩)",
      stockQuantity: 49,
      recommended: 0,
      maxQuantityPerDelivery: 10,
    },
    {
      productId: 1,
      productName: "국내산 고등어(중대)10팩(120~140gx10팩) ",
      regularPrice: 100,
      salePrice: 0,
      description: "NULL",
      stockQuantity: 57,
      recommended: 0,
      maxQuantityPerDelivery: 3,
    },
    {
      productId: 5,
      productName: "구운 뼈 고등어 1팩 (180g) ",
      regularPrice: 3000,
      salePrice: 150,
      description: "바로 구워 전자렌지1분 간편생선",
      stockQuantity: 0,
      recommended: 0,
      maxQuantityPerDelivery: 30,
    },
    {
      productId: 23,
      productName: "손질 참돔 3미 ",
      regularPrice: 47000,
      salePrice: 2000,
      description: "(400g내외x3팩)",
      stockQuantity: 49,
      recommended: 0,
      maxQuantityPerDelivery: 10,
    },
    {
      productId: 1,
      productName: "국내산 고등어(중대)10팩(120~140gx10팩) ",
      regularPrice: 100,
      salePrice: 0,
      description: "NULL",
      stockQuantity: 57,
      recommended: 0,
      maxQuantityPerDelivery: 3,
    },
    {
      productId: 5,
      productName: "구운 뼈 고등어 1팩 (180g) ",
      regularPrice: 3000,
      salePrice: 150,
      description: "바로 구워 전자렌지1분 간편생선",
      stockQuantity: 0,
      recommended: 0,
      maxQuantityPerDelivery: 30,
    },
    {
      productId: 23,
      productName: "손질 참돔 3미 ",
      regularPrice: 47000,
      salePrice: 2000,
      description: "(400g내외x3팩)",
      stockQuantity: 49,
      recommended: 0,
      maxQuantityPerDelivery: 10,
    },
    {
      productId: 1,
      productName: "국내산 고등어(중대)10팩(120~140gx10팩) ",
      regularPrice: 100,
      salePrice: 0,
      description: "NULL",
      stockQuantity: 57,
      recommended: 0,
      maxQuantityPerDelivery: 3,
    },
    {
      productId: 5,
      productName: "구운 뼈 고등어 1팩 (180g) ",
      regularPrice: 3000,
      salePrice: 150,
      description: "바로 구워 전자렌지1분 간편생선",
      stockQuantity: 0,
      recommended: 0,
      maxQuantityPerDelivery: 30,
    },
    {
      productId: 23,
      productName: "손질 참돔 3미 ",
      regularPrice: 47000,
      salePrice: 2000,
      description: "(400g내외x3팩)",
      stockQuantity: 49,
      recommended: 0,
      maxQuantityPerDelivery: 10,
    },
    {
      productId: 1,
      productName: "국내산 고등어(중대)10팩(120~140gx10팩) ",
      regularPrice: 100,
      salePrice: 0,
      description: "NULL",
      stockQuantity: 57,
      recommended: 0,
      maxQuantityPerDelivery: 3,
    },
    {
      productId: 5,
      productName: "구운 뼈 고등어 1팩 (180g) ",
      regularPrice: 3000,
      salePrice: 150,
      description: "바로 구워 전자렌지1분 간편생선",
      stockQuantity: 0,
      recommended: 0,
      maxQuantityPerDelivery: 30,
    },
    {
      productId: 23,
      productName: "손질 참돔 3미 ",
      regularPrice: 47000,
      salePrice: 2000,
      description: "(400g내외x3팩)",
      stockQuantity: 49,
      recommended: 0,
      maxQuantityPerDelivery: 10,
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

  const Progress = ({ value }) => {
    let color;
    if (value >= 100) {
      color = "info";
      value = 100;
    } else if (value >= 60) {
      color = "info";
    } else if (value >= 40) {
      color = "warning";
    } else if (value >= 10) {
      color = "error";
    } else {
      color = "error";
      value = 5;
    }

    return (
      <MDBox display="flex" alignItems="center">
        <MDBox ml={0.5} width="9rem">
          <MDProgress variant="gradient" color={color} value={value} />
        </MDBox>
      </MDBox>
    );
  };

  const dataColumns = [
    { Header: "상품", accessor: "product", align: "left" },
    { Header: "정상가", accessor: "regularPrice", align: "center" },
    { Header: "할인", accessor: "salePrice", align: "center" },
    { Header: "최종가", accessor: "finalPrice", align: "center" },
    { Header: "설명", accessor: "description", align: "center" },
    { Header: "재고", accessor: "stockQuantity", align: "center" },
    { Header: "재고 위험도", accessor: "risk", align: "center" },
    { Header: "추천 수", accessor: "recommended", align: "center" },
    { Header: "배송비 당 최대 허용 수", accessor: "maxQuantityPerDelivery", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];
  return {
    columns: dataColumns,

    rows: datas.map((data, index) => ({
      product: <Product image={LogoAsana} name={data.productName} />,
      regularPrice: [data.regularPrice],
      salePrice: [data.salePrice],
      finalPrice: [data.regularPrice] - [data.salePrice],
      description: [data.description],
      stockQuantity: [data.stockQuantity],
      risk: <Progress value={(data.stockQuantity / 100) * 100} />,
      recommended: [data.recommended],
      maxQuantityPerDelivery: [data.maxQuantityPerDelivery],
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
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                  >
                    <MDTypography variant="h6" color="white">
                      상품 상세 정보
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
                            regularPrice: (
                              <MDInput
                                type="number"
                                label="정상가"
                                value={rowData.regularPrice}
                                onChange={(e) => {
                                  const newData = { ...rowData, regularPrice: e.target.value };
                                  setRowData(newData);
                                }}
                              />
                            ),
                            salePrice: (
                              <MDInput
                                type="number"
                                label="할인"
                                value={rowData.salePrice}
                                onChange={(e) => {
                                  const newData = { ...rowData, salePrice: e.target.value };
                                  setRowData(newData);
                                }}
                              />
                            ),
                            finalPrice: [rowData.regularPrice] - [rowData.salePrice],
                            description: (
                              <MDInput
                                type="text"
                                label="설명"
                                value={rowData.description}
                                onChange={(e) => {
                                  const newData = { ...rowData, description: e.target.value };
                                  setRowData(newData);
                                }}
                              />
                            ),
                            stockQuantity: (
                              <MDInput
                                type="number"
                                label="재고"
                                value={rowData.stockQuantity}
                                onChange={(e) => {
                                  const newData = { ...rowData, stockQuantity: e.target.value };
                                  setRowData(newData);
                                }}
                              />
                            ),
                            risk: <Progress value={(1 - rowData.stockQuantity / 100) * 100} />,
                            recommended: (
                              <MDInput
                                type="number"
                                label="추천 수"
                                value={rowData.recommended}
                                onChange={(e) => {
                                  const newData = { ...rowData, recommended: e.target.value };
                                  setRowData(newData);
                                }}
                              />
                            ),
                            maxQuantityPerDelivery: (
                              <MDInput
                                type="number"
                                label="배송비 당 최대 허용 수"
                                value={rowData.maxQuantityPerDelivery}
                                onChange={(e) => {
                                  const newData = {
                                    ...rowData,
                                    maxQuantityPerDelivery: e.target.value,
                                  };
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
