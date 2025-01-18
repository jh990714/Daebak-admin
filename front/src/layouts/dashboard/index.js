// @mui material components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton } from "@mui/material";

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

// API 함수
import { refreshStatus } from "api/dashboard"; // refreshStatus 함수 import

function Dashboard() {
  const [visitCount, setVisitCount] = useState(0);
  const [salesAmount, setSalesAmount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [endDate, setEndDate] = useState(new Date());
  const [refreshKey, setRefreshKey] = useState(0);

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

  // 데이터 가져오는 함수
  const fetchData = async () => {
    await refreshStatus();

    const visitCountDatas = await dailyVisitCountData(startDate, endDate);
    setDailyVisitCount(visitCountDatas);

    const salesAmountDatas = await dailySalesAmountData(startDate, endDate);
    setDailySalesAmount(salesAmountDatas);

    const salesCountDatas = await dailySalesCountData(startDate, endDate);
    setDailySalesCount(salesCountDatas);
  };

  // 방문자, 수익, 판매량 데이터 가져오는 함수
  const fetchVisitData = async () => {
    const today = new Date();
    const count = await fetchVisitCount(today);
    setVisitCount(count);
  };

  const fetchSalesData = async () => {
    const today = new Date();
    const amount = await fetchSalesAmount(today);
    setSalesAmount(amount);

    const count = await fetchSalesCount(today);
    setSalesCount(count);
  };

  // 페이지 로드 시 데이터 가져오기
  useEffect(() => {
    fetchData();
    fetchVisitData();
    fetchSalesData();
  }, [startDate, endDate]);

  // 새로고침 버튼 클릭 시 데이터 다시 가져오기
  const handleRefresh = async () => {
    try {
      await refreshStatus();

      setRefreshKey((prevKey) => prevKey + 1);
      fetchData();
      fetchVisitData();
      fetchSalesData();
    } catch (error) {
      console.error("새로고침 실패:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* 새로고침 버튼 추가 */}
        <IconButton
          color="primary"
          onClick={handleRefresh}
          sx={{
            marginBottom: "20px",
            backgroundColor: "white", // 버튼 배경색
            color: "primary.main", // 아이콘 색상
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // 그림자 효과
            "&:hover": {
              backgroundColor: "rgba(0, 123, 255, 0.1)", // 호버 상태 배경색
              transform: "scale(1.1)", // 약간 확대 효과
            },
            borderRadius: "50%", // 동그란 모양 유지
            transition: "all 0.3s ease", // 부드러운 애니메이션
          }}
        >
          <RefreshIcon sx={{ fontSize: 24 }} />
        </IconButton>

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
                  label: "than last week",
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
              <Projects refreshKey={refreshKey} />
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
