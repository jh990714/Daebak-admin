import { useEffect, useState } from "react";
import { QnaCompletedTable } from "./qnaCompletedTable";
import { QnaMissingTable } from "./qnaMissingTable";

function QnaTable() {
  return (
    <>
      <QnaMissingTable />
      <QnaCompletedTable />
    </>
  );
}
export default QnaTable;
