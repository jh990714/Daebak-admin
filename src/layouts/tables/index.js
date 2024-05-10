/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
// import parentcategorisTableData from "layouts/tables/data/parentcategoriesTableData";
import categorisTableData from "layouts/tables/data/categoriesTableData";
import reviewTableData from "layouts/tables/data/reviewTableData";
import CategoryTable from "./data/CategoryTable";

import MDButton from "components/MDButton";
import { CategoryUpdate } from "./update/categoryUpdate";

function Tables() {
  const { columns, rows } = authorsTableData();
  // const { columns: parentcategoryColumns, rows: parentcategoryRows } = parentcategorisTableData();
  const { columns: categoryColumns, rows: categoryRows } = categorisTableData();
  const { columns: reviewColumns, rows: reviewRows } = reviewTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [data, setData] = useState();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const handleAddCategory = () => {
    setData("");
    setShowAddCategory(!showAddCategory);
    console.log(data);
  };
  const handleSaveCategory = () => {
    setShowAddCategory(!showAddCategory);
  };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="success"
                  borderRadius="lg"
                  coloredShadow="success"
                >
                  <MDTypography variant="h6" color="white">
                    사용자
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
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
                      <MDButton variant="h2" color="white" onClick={handleAddCategory}>
                        추가
                      </MDButton>
                    </div>
                  </MDTypography>
                </MDBox>
                <MDBox p={3}>
                  <CategoryTable />
                </MDBox>
              </Card>
            </Grid>
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
                    상품 카테고리 ( 하위 )
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns: categoryColumns, rows: categoryRows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
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
                    상품 후기
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns: reviewColumns, rows: reviewRows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
      {showAddCategory && (
        <CategoryUpdate
          data={data}
          setData={setData}
          isOpen={true}
          handleClose={handleAddCategory}
          handleSubmit={handleSaveCategory}
        />
      )}
    </>
  );
}

export default Tables;
