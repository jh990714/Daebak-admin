import { useEffect, useState } from "react";
import { CompletedQnaTable } from "./completedQnaTable";
import { MissingQnaTable } from "./missingQnaTable";

function QnaTable() {
  return (
    <>
      <MissingQnaTable />
      <CompletedQnaTable />
    </>
  );
}
export default QnaTable;
