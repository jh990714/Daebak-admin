import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ProductsTableData from "./productsTableData";
import { fetchProducts } from "reducers/slices/productSlice";
import datas from "./datas";

export default function data(category = null) {
  const { products } = useSelector((state) => state.products);

  console.log("productByCategoryTableData");
  const customDatas = category
    ? products.filter((data) => data.category === category.id)
    : products;

  const { columns, rows } = ProductsTableData({ customDatas });

  return {
    columns: columns,
    rows: rows,
  };
}
