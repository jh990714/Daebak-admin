import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import qnaTableData from "layouts/tables/qnaTable/data/qnaTableData";
import datas from "../../data/datas";

export default function data() {
  //   const { products } = useSelector((state) => state.products);

  //   답변 등록이 완료된 데이터를 넣어줘야함.
  const customDatas = datas.filter((data) => data.answer.length > 0);

  const {
    columns: completedQnaColumns,
    rows: completedQnaRows,
    expanded: expanded,
  } = qnaTableData({ customDatas });

  return {
    columns: completedQnaColumns,
    rows: completedQnaRows,
    expanded: expanded,
  };
}
