import React, { useState } from "react";

import PropTypes from "prop-types";

import { Autocomplete, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

export const ProductCategory = ({ setRowData }) => {
  const categories = [
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
  ];

  const dataColumns = [
    { Header: "상위 카테고리", accessor: "parentCategory", align: "left" },
    { Header: "하위 카테고리", accessor: "childCategory", align: "left" },
  ];

  const [selectedParentCategory, setSelectedParentCategory] = useState(null);
  const [selectedChildCategory, setSelectedChildCategory] = useState(null);

  const handleParentCategoryChange = (event, value) => {
    setSelectedParentCategory(value);
    setSelectedChildCategory(null);
    setRowData({
      parentId: value ? value.id : null,
      childId: null,
    });
  };

  const handleChildCategoryChange = (event, value) => {
    if (selectedParentCategory) {
      setSelectedChildCategory(value);

      setRowData({
        parentId: selectedParentCategory.id,
        childId: value ? value.id : null,
      });
    }
  };

  return (
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
          상품 카테고리
        </MDTypography>
      </MDBox>
      <MDBox pt={3}>
        <DataTable
          table={{
            columns: dataColumns,
            rows: [
              {
                parentCategory: (
                  <MDBox>
                    <Autocomplete
                      options={categories}
                      sx={{ width: 500 }}
                      getOptionLabel={(option) => option?.name}
                      value={selectedParentCategory}
                      onChange={handleParentCategoryChange}
                      renderInput={(params) => <TextField {...params} label="상위 카테고리" />}
                    />
                  </MDBox>
                ),
                childCategory: (
                  <MDBox>
                    <Autocomplete
                      options={selectedParentCategory ? selectedParentCategory.subcategories : [""]}
                      sx={{ width: 500 }}
                      getOptionLabel={(option) => option.name}
                      value={selectedChildCategory}
                      onChange={handleChildCategoryChange}
                      renderInput={(params) => <TextField {...params} label="하위 카테고리" />}
                    />
                  </MDBox>
                ),
              },
            ],
          }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
        />
      </MDBox>
    </Card>
  );
};

ProductCategory.propTypes = {
  setRowData: PropTypes.func,
};
