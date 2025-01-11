import React from "react";
import PropTypes from "prop-types";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

export const ProductSubInfo = ({ rowData, setRowData }) => {
  const dataColumns = [{ Header: "세부정보 이미지", accessor: "image", align: "left" }];

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      // 첫 번째 파일만 사용
      const file = files[0];
      const newData = { ...rowData, image: file };
      setRowData(newData);
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
          상품 세부정보
        </MDTypography>
      </MDBox>
      <MDBox pt={3}>
        <DataTable
          table={{
            columns: dataColumns,
            rows: [
              {
                image: (
                  <>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {rowData?.image && (
                      <img src={URL.createObjectURL(rowData?.image)} alt="Selected Image" />
                    )}
                  </>
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

ProductSubInfo.propTypes = {
  rowData: PropTypes.object,
  setRowData: PropTypes.func.isRequired,
};
