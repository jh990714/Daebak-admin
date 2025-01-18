import { useState, useEffect } from "react";
import { fetchProductSales } from "api/productSales";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";
import PropTypes from "prop-types";

function Projects({ refreshKey }) {
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 7));
  const { columns, rows, totalAmount } = data(startDate, refreshKey);
  const [pageIndex, setPageIndex] = useState(0);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value); // 시작 날짜 변경
  };

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            상품 판매 현황
          </MDTypography>

          {/* 날짜 선택과 판매 금액을 가로로 배치 */}
          <MDBox display="flex" alignItems="center" gap={2}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
                mr: 1,
              }}
            >
              done
            </Icon>

            <TextField
              margin="dense"
              type="month"
              fullWidth
              value={startDate}
              onChange={handleStartDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <MDBox display="flex" alignItems="center">
              <MDTypography variant="button" fontWeight="regular" whiteSpace="nowrap" color="text">
                <strong>{totalAmount.toLocaleString()}원</strong> 판매 완료
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          isSorted={true}
          entriesPerPage={true}
          pagination={{ variant: "gradient", color: "info" }}
          showTotalEntries={true}
          noEndBorder
          defaultPage={pageIndex}
          onPageChange={handlePageChange}
        />
      </MDBox>
    </Card>
  );
}

export default Projects;

Projects.propTypes = {
  refreshKey: PropTypes.number.isRequired, // refreshKey는 숫자형이고 필수값입니다.
};
