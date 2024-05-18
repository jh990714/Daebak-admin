import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import reviewTableData from "layouts/tables/reviewTable/data/reviewTableData";
import datas from "../../data/datas";

export default function data() {
  //   const { products } = useSelector((state) => state.products);

  //   답변 등록이 완료된 데이터를 넣어줘야함.
  const customDatas = datas.filter((data) => data.response.length > 0);

  const {
    columns: completedReviewColumns,
    rows: completedReviewRows,
    expanded: expanded,
  } = reviewTableData({ customDatas });

  return {
    columns: completedReviewColumns,
    rows: completedReviewRows,
    expanded: expanded,
  };
}
