import React, { useEffect, useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DataTable from "examples/Tables/DataTable";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CategoryAdd } from "layouts/categoryAdd";
import { CategoryEditDialog } from "./dialog/categoryEditDialog";

import { ProductByCategoryTable } from "./ProductByCategoryTable";

function CategoryTable() {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState();
  const [categories, setCategories] = useState([
    {
      id: 2,
      name: "생선",
      subcategories: [
        { id: 8, name: "고등어" },
        { id: 9, name: "삼치-조기" },
        { id: 10, name: "굴비" },
        { id: 11, name: "장어" },
        { id: 12, name: "돔" },
      ],
    },
    {
      id: 3,
      name: "갑각",
      subcategories: [
        { id: 13, name: "새우" },
        { id: 14, name: "게" },
        { id: 15, name: "낙지" },
        { id: 16, name: "오징어" },
        { id: 17, name: "문어" },
      ],
    },
    {
      id: 4,
      name: "조개",
      subcategories: [
        { id: 18, name: "전복" },
        { id: 19, name: "소라" },
        { id: 20, name: "가리비(준비중)" },
        { id: 21, name: "키조개(준비중)" },
        { id: 22, name: "새조개(준비중)" },
      ],
    },
    {
      id: 5,
      name: "해조",
      subcategories: [
        { id: 23, name: "다시마(준비중)" },
        { id: 24, name: "김(준비중)" },
        { id: 25, name: "미역(준비중)" },
        { id: 26, name: "해초(준비중)" },
      ],
    },
    {
      id: 6,
      name: "수산가공품",
      subcategories: [
        { id: 27, name: "회(준비중)" },
        { id: 28, name: "해산물볶음" },
        { id: 29, name: "오징어채" },
        { id: 30, name: "어묵" },
      ],
    },
    {
      id: 7,
      name: "기타 수산물",
      subcategories: [
        { id: 31, name: "소금염장어" },
        { id: 32, name: "멸치" },
        { id: 33, name: "냉동생선" },
      ],
    },
  ]);
  // const [categories, setCategories] = useState([]);

  // useEffect(async () => {
  //   const response = await axios.get(`http://localhost:8080/categories`);
  //   setCategories(response.data);
  // }, []);
  const [clickedCategories, setClickedCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const handleCloseCategory = () => {
    setShowAddCategory(!showAddCategory);
  };

  const handleSaveCategory = () => {
    const updatedCategories = categories.map((category) => {
      if (category.id === data.id) {
        return { ...data };
      }
      return category;
    });
    setCategories(updatedCategories);
    setShowPopup(false);
  };
  const handleShowCategory = (category) => {
    setData(category);
    setShowPopup(true);
  };

  const handleDeleteCategory = (category) => {
    const confirmDelete = window.confirm(`"${category.name}" 카테고리를 정말로 삭제하시겠습니까?`);
    if (confirmDelete) {
      const newData = categories.filter((oriCategory) => oriCategory !== category);
      setCategories(newData);
    }
  };

  const handleShowProduct = (subCategory) => {
    const isAlreadyClicked = clickedCategories.some(
      (clickedCategory) => clickedCategory.id === subCategory.id
    );
    console.log(isAlreadyClicked, subCategory);
    if (isAlreadyClicked) {
      const updatedClickedCategories = clickedCategories.filter(
        (clickedCategory) => clickedCategory.id !== subCategory.id
      );
      setClickedCategories(updatedClickedCategories);
    } else {
      setClickedCategories((prevClickedCategories) => [...prevClickedCategories, subCategory]);
    }
    console.log(clickedCategories);
  };
  return (
    <>
      <Grid item xs={12}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>상품 카테고리 ( 상위 )</span>
                <MDButton variant="h2" color="white" onClick={() => setShowAddCategory(true)}>
                  추가
                </MDButton>
              </div>
            </MDTypography>
          </MDBox>
          <MDBox p={3}>
            <div className="flex flex-wrap px-10 gap-20">
              {categories.map((category, index) => (
                <div key={index} className="rounded-md">
                  <div key={index} className="flex gap-5 items-center border-b-4">
                    <span className="font-semibold text-xl">{category.name}</span>
                    <div>
                      <IconButton onClick={() => handleShowCategory(category)} size="medium">
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteCategory(category)}
                        size="medium"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-4">
                    {category.subcategories.map((subCategory, subIndex) => (
                      <li
                        key={subIndex}
                        className={`cursor-pointer text-sm border-b-[1px]${
                          clickedCategories.some(
                            (clickedCategory) => clickedCategory.id === subCategory.id
                          )
                            ? " text-blue-500 font-bold"
                            : ""
                        }`}
                        onClick={() => handleShowProduct(subCategory)}
                      >
                        {subCategory.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {showPopup && (
                <CategoryEditDialog
                  data={data}
                  setData={setData}
                  isOpen={showPopup}
                  handleClose={() => setShowPopup(false)}
                  handleSubmit={handleSaveCategory}
                />
              )}
            </div>
          </MDBox>
        </Card>
      </Grid>
      {clickedCategories.map((clickedCategory) => (
        <Grid key={clickedCategory.id} item xs={12}>
          <ProductByCategoryTable category={clickedCategory} />
        </Grid>
      ))}
      {showAddCategory && <CategoryAdd isOpen={true} onClose={handleCloseCategory} />}
    </>
  );
}

export default CategoryTable;
