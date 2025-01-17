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

function Projects() {
  const [menu, setMenu] = useState(null);
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 7)); // 시작 날짜 상태
  const { columns, rows, totalAmount } = data(startDate); // startDate를 이용하여 데이터 호출

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value); // 시작 날짜 변경
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

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
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Projects;
