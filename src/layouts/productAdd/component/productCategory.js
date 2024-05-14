import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import { Autocomplete, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import datas from "layouts/tables/categoryTable/data/categoryDatas";

export const ProductCategory = ({ rowData, setRowData }) => {
  const categories = datas;

  const dataColumns = [
    { Header: "상위 카테고리", accessor: "parentCategory", align: "left" },
    { Header: "하위 카테고리", accessor: "childCategory", align: "left" },
  ];

  const [selectedParentCategory, setSelectedParentCategory] = useState(rowData.parentId);
  const [selectedChildCategory, setSelectedChildCategory] = useState(rowData.childId);

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
  rowData: PropTypes.shape({
    parentId: PropTypes.number,
    childId: PropTypes.number,
  }),
  setRowData: PropTypes.func,
};

ProductCategory.defaultProps = {
  rowData: {
    parentId: null,
    childId: null,
  },
};
