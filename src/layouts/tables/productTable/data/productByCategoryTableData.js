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
import ProductsTableData from "./productsTableData";
import datas from "./datas";

export default function data(category = null) {
  // const { customDatas } = datas.reduce(
  //   (acc, data) => {
  //     acc.customDatas.push(data);
  //     return acc;
  //   },
  //   { customDatas: [] }
  // );
  let customDatas;
  console.log(category);
  if (category !== null) {
    customDatas = datas.filter((data) => data.category === category.id);
  } else {
    customDatas = datas;
  }

  const { columns, rows } = ProductsTableData({ customDatas });

  return {
    columns: columns,

    rows: rows,
  };
}
