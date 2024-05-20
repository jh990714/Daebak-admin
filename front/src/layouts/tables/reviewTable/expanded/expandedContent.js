import React from "react";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import EditNoteIcon from "@mui/icons-material/EditNote";

import { IconButton } from "@mui/material";

import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { fetchSaveReviews } from "reducers/slices/reviewSlice";

export const ExpandedContent = ({ rowData }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleEditNoteIconClick = () => {
    const reviewResponse = {
      adminId: 1,
      responseText: inputValue,
    };
    console.log(rowData.reviewId, inputValue);
    dispatch(fetchSaveReviews({ reviewId: rowData.reviewId, reviewResponse }))
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });
  };
  return (
    <>
      <ul className="mb-4 p-2 overflow-y-auto max-h-60 gap-y-2">
        {rowData.response.map((res, index) => (
          <li key={index} className="flex mb-4 gap-4">
            ⤷
            <MDTypography width={"100%"} display="flex" flexDirection="column">
              <span className="text-sm">{new Date(res.responseDate).toLocaleString()} </span>
              <MDInput
                value={res.responseText}
                multiline
                rows={3}
                fullWidth
                maxWidth={"xl"}
                readOnly
              />
            </MDTypography>
          </li>
        ))}
      </ul>
      <div className="flex gap-4 p-2 border-y">
        ⤷
        <MDInput
          label={"답변작성"}
          multiline
          rows={3}
          fullWidth={true}
          maxWidth={"xl"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <IconButton aria-label="send response" onClick={handleEditNoteIconClick}>
          <EditNoteIcon />
        </IconButton>
      </div>
    </>
  );
};

ExpandedContent.propTypes = {
  rowData: PropTypes.object,
};
