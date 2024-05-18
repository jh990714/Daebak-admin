import { useState } from "react";
import { ReviewCompletedTable } from "./reviewCompletedTable";
import { ReviewMissingTable } from "./reviewMissingTable";

function ReviewTable() {
  return (
    <>
      <ReviewMissingTable />
      <ReviewCompletedTable />
    </>
  );
}
export default ReviewTable;
