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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import dailySalesAmountData from "./data/reportsLineChartData/dailySalesAmountData";
import dailySalesCountData from "./data/reportsLineChartData/dailySalesCountData";
import dailyVisitCountData from "./data/reportsBarChartData/dailyVisitCountData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect, useState } from "react";
import { fetchVisitCount } from "api/visitCount";
import { fetchSalesAmount } from "api/salesAmount";
import { fetchSalesCount } from "api/salesCount";

function Dashboard() {
  const [visitCount, setVisitCount] = useState(0);
  const [salesAmount, setSalesAmount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [endDate, setEndDate] = useState(new Date());
  const [dailyVisitCount, setDailyVisitCount] = useState({
    labels: [],
    datasets: { label: "방문자", data: [] },
  });
  const [dailySalesAmount, setDailySalesAmount] = useState({
    labels: [],
    datasets: { label: "판매 수익", data: [] },
  });
  const [dailySalesCount, setDailySalesCount] = useState({
    labels: [],
    datasets: { label: "판매량", data: [] },
  });

  useEffect(() => {
    const fetchData = async () => {
      const visitCountDatas = await dailyVisitCountData(startDate, endDate);
      setDailyVisitCount(visitCountDatas);

      const salesAmountDatas = await dailySalesAmountData(startDate, endDate);
      setDailySalesAmount(salesAmountDatas);

      const salesCountDatas = await dailySalesCountData(startDate, endDate);
      setDailySalesCount(salesCountDatas);
    };
    fetchData();
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchVisitData = async () => {
      const today = new Date();
      const count = await fetchVisitCount(today); // 오늘 날짜로 방문자 수 요청
      setVisitCount(count); // 상태 업데이트
    };
    fetchVisitData();
  }, []);

  useEffect(() => {
    const fetchSalesData = async () => {
      const today = new Date();

      const amount = await fetchSalesAmount(today); // 오늘의 수익 요청
      setSalesAmount(amount); // 상태 업데이트

      const count = await fetchSalesCount(today);
      setSalesCount(count);
    };
    fetchSalesData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="오늘의 방문자"
                count={visitCount}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="오늘의 수익"
                count={salesAmount.toLocaleString()}
                percentage={{
                  color: "error",
                  amount: "-1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="오늘의 판매량"
                count={salesCount}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="오늘의 가입자"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "방금 업데이트되었습니다.",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="방문자 수"
                  description="지난 주 데이터입니다."
                  date="campaign sent 2 days ago"
                  chart={dailyVisitCount}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="일일 판매 수익"
                  description={
                    <>
                      (<strong>+15%</strong>) 매출이 증가하였습니다.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={dailySalesAmount}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="일일 판매량"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={dailySalesCount}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
