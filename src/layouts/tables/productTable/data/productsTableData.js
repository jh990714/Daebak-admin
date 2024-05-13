import PropTypes from "prop-types";

import { Menu, MenuItem, IconButton, Button } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

import LogoAsana from "assets/images/small-logos/logo-asana.svg";

import { useEffect, useState } from "react";
import { ProductEditDialog } from "../dialog/productEditDialog";

const ProductsTableData = ({ customDatas }) => {
  const dataColumns = [
    { Header: "상품", accessor: "product", align: "left" },
    { Header: "정상가", accessor: "regularPrice", align: "center" },
    { Header: "할인", accessor: "salePrice", align: "center" },
    { Header: "최종가", accessor: "finalPrice", align: "center" },
    { Header: "설명", accessor: "description", align: "center" },
    { Header: "재고", accessor: "stockQuantity", align: "center" },
    { Header: "재고 위험도", accessor: "risk", align: "center" },
    { Header: "추천 상품 여부", accessor: "recommended", align: "center" },
    { Header: "배송비 당 최대 허용 수", accessor: "maxQuantityPerDelivery", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];
  const [anchorEls, setAnchorEls] = useState(Array(customDatas.length).fill(null));
  const [dialogAnchorEl, setDialogAnchorEl] = useState(0);

  const [rowData, setRowData] = useState(customDatas[0]); // 수정할 행의 데이터
  const [editDialogs, setEditDialogs] = useState(Array(customDatas.length).fill(false));

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
    setDialogAnchorEl(index);

    setRowData(customDatas[index]);
  };

  const handleClose = () => {
    setAnchorEls(Array(customDatas.length).fill(null));
  };

  const handleEdit = () => {
    setEditDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: true,
    }));
    handleClose();
  };

  const handleRecommendedToggle = () => {
    // datas[dialogAnchorEl].recommended = !datas[dialogAnchorEl].recommended;
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
  Product.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

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
  Progress.propTypes = {
    value: PropTypes.number.isRequired,
  };

  const transformDataForProduct = (customDatas) => {
    return customDatas.map((data, index) => ({
      product: <Product image={LogoAsana} name={data.productName} />,
      regularPrice: data.regularPrice,
      salePrice: data.salePrice,
      finalPrice: data.regularPrice - data.salePrice,
      description: data.description,
      stockQuantity: data.stockQuantity,
      risk: <Progress value={(data.stockQuantity / 100) * 100} />,
      recommended: data.recommended,
      maxQuantityPerDelivery: data.maxQuantityPerDelivery,
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
            <MenuItem onClick={handleRecommendedToggle}>
              {rowData.recommended ? "추천 상품 해제" : "추천 상품 등록"}
            </MenuItem>
            <MenuItem onClick={handleDelete}>삭제</MenuItem>
          </Menu>
          <ProductEditDialog
            rowData={rowData}
            setRowData={setRowData}
            isOpen={editDialogs[index]}
            handleEditDialogClose={handleEditDialogClose}
            handleEditDialogSubmit={handleEditDialogSubmit}
          />
        </>
      ),
    }));
  };

  return {
    columns: dataColumns,

    rows: transformDataForProduct(customDatas),
  };
};

ProductsTableData.propTypes = {
  customDatas: PropTypes.array.isRequired,
};

export default ProductsTableData;
