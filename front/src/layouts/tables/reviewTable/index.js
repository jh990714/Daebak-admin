import { useState } from "react";
import { CompletedReviewTable } from "./completedReviewTable";
import { MissingReviewTable } from "./missingReviewTable";

function ReviewTable() {
  const [pageIndex, setPageIndex] = useState(0);
  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  return (
    <>
      <MissingReviewTable />
      <CompletedReviewTable />
    </>
  );
}
export default ReviewTable;
