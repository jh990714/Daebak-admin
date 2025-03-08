import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { fetchUpdateAd } from "reducers/slices/adSlice";
import { fetchCreateAd } from "reducers/slices/adSlice";

export const AdEditDialog = ({ rowData, mode = "edit", isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(rowData);
  const [adImage, setAdImage] = useState(null);

  useEffect(() => {
    setData(rowData);
    setAdImage(null);
  }, [rowData, isOpen]);

  const handleSaveChanges = () => {
    const formData = new FormData();

    if (adImage) {
      formData.append("image", adImage);
    }

    if (data.linkUrl) {
      formData.append("linkUrl", data.linkUrl);
    }

    if (data.startDate) {
      formData.append("startDate", data.startDate);
    }

    if (data.endDate) {
      formData.append("endDate", data.endDate);
    }

    if (mode === "edit" && data.adId) {
      formData.append("adId", data.adId);
      dispatch(fetchUpdateAd(formData))
        .then(() => console.log("수정 성공"))
        .catch((error) => console.error("수정 실패:", error));
    } else if (mode === "create") {
      dispatch(fetchCreateAd(formData))
        .then(() => console.log("생성 성공"))
        .catch((error) => console.error("생성 실패:", error));
    }
    onClose();
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdImage(file);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={"xl"}>
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
              광고 편집
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {/* 이미지 미리보기 */}
            {adImage ? (
              <img src={URL.createObjectURL(adImage)} alt="Selected Image" width="900px" />
            ) : (
              data.imageUrl && <img src={data.imageUrl} alt="Existing Image" width="900px" />
            )}
            <TextField
              margin="dense"
              label="링크"
              fullWidth
              value={data.linkUrl}
              onChange={(e) => handleInputChange(e, "linkUrl")}
            />
            <TextField
              margin="dense"
              label="시작 시간"
              type="date"
              fullWidth
              value={data.startDate}
              onChange={(e) => handleInputChange(e, "startDate")}
            />
            <TextField
              margin="dense"
              label="종료 시간"
              type="date"
              fullWidth
              value={data.endDate}
              onChange={(e) => handleInputChange(e, "endDate")}
            />
          </MDBox>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSaveChanges}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

// PropTypes 설정
AdEditDialog.propTypes = {
  rowData: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
