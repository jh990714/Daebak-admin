import React, { useState } from "react";

import PropTypes from "prop-types";
import CustomDataTable from "examples/CustomTable/CustomDataTable";

export const QnaCustomTable = ({ columns, rows }) => {
  const [data, setData] = useState();
  const handleSubmit = () => {
    console.log(data);
  };
  const handleDataChange = (event) => {
    setData(event.target.value); // 입력한 답변 텍스트 업데이트
  };

  console.log(columns, rows);
  return (
    <CustomDataTable
      canSearch={true}
      table={{ columns: columns, rows: rows }}
      isSorted={false}
      entriesPerPage={false}
      showTotalEntries={false}
      noEndBorder
      handleDataChange={handleDataChange}
      handleSubmit={handleSubmit}
    />
  );
};

QnaCustomTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};
