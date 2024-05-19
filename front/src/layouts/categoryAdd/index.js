import React, { useState } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { RemoveCircle, AddCircleOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { fetchUpdateCategories } from "reducers/slices/categorySlice";
import { useDispatch } from "react-redux";

export const CategoryAdd = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const handleAddSubcategory = () => {
    const newSubcategories = [...(data.subcategories || []), { id: null, name: "" }];
    const newData = { ...data, subcategories: newSubcategories };
    setData(newData);
  };

  const handleRemoveSubcategory = (indexToRemove) => {
    if (data.subcategories) {
      const newSubcategories = data.subcategories.filter((_, index) => index !== indexToRemove);
      const newData = { ...data, subcategories: newSubcategories };
      setData(newData);
    }
  };

  const handleSubmit = () => {
    console.log(data);
    dispatch(fetchUpdateCategories(data))
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });
    onClose();
    console.log(data);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth={"xl"}>
      <DialogTitle>상품 카테고리 추가</DialogTitle>
      <DialogContent>
        <Card>
          <MDBox
            mx={2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              <MDInput
                type="text"
                label="상위 카테고리"
                value={data?.name}
                onChange={(e) => {
                  const newData = { ...data, name: e.target.value };
                  setData(newData);
                }}
                InputProps={{
                  inputProps: {
                    style: { color: "white" },
                  },
                }}
                InputLabelProps={{ style: { color: "white" } }}
              />
            </MDTypography>
          </MDBox>
          <MDBox mx={2} py={3} px={2}>
            {data?.subcategories?.map((subcategory, index) => (
              <div key={index} className="mb-4">
                <MDInput
                  type="text"
                  label="하위 카테고리"
                  value={subcategory?.name}
                  onChange={(e) => {
                    const newSubcategories = [...(data.subcategories || [])];
                    newSubcategories[index] = { ...newSubcategories[index], name: e.target.value };
                    const newData = { ...data, subcategories: newSubcategories };
                    setData(newData);
                  }}
                />
                <IconButton color="error" onClick={() => handleRemoveSubcategory(index)}>
                  <RemoveCircle />
                </IconButton>
              </div>
            ))}
            <Button onClick={handleAddSubcategory}>추가</Button>
          </MDBox>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

CategoryAdd.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
