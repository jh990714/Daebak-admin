import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ProductsTableData from "./productsTableData";
import { fetchProducts } from "reducers/slices/productSlice";
import datas from "./datas";

export default function data(category = null) {
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

  const products = datas;
  const customDatas = category
    ? products.filter((data) => data.category === category.id)
    : products;

  const { columns, rows } = ProductsTableData({ customDatas });

  return {
    columns: columns,
    rows: rows,
  };
}
