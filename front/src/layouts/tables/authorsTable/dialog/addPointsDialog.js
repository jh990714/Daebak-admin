import React, { useState } from "react";

import PropTypes from "prop-types";

import { Autocomplete, Button, TextField } from "@mui/material";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

export const AddPointsDialog = ({ selectRows, isOpen, onClose }) => {
  const [points, setPoints] = useState(0);

  const handleSubmit = () => {
    console.log(selectRows, points);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <Card>
          <MDBox
            mx={2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="success"
            borderRadius="lg"
            coloredShadow="success"
          >
            <MDTypography variant="h6" color="white">
              적립금 추가
            </MDTypography>
          </MDBox>
          <MDBox p={3}>
            <MDInput
              type="number"
              label="적립금"
              value={points}
              onChange={(e) => {
                setPoints(e.target.value);
              }}
            />
            원
          </MDBox>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit}>추가</Button>
      </DialogActions>
    </Dialog>
  );
};

AddPointsDialog.propTypes = {
  selectRows: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
