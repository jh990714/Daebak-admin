import { useEffect, useState } from "react";
import { fetchProductSales } from "api/productSales";

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import PropTypes from "prop-types";

// 상품과 관련된 컴포넌트
const Company = ({ image, name }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={name} size="md" sx={{ borderRadius: 2 }} />
    <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
      {name}
    </MDTypography>
  </MDBox>
);

Company.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default function data(startDate, endDate, refreshKey) {
  const [rowDatas, setRowDatas] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateCompletion = (amount) => {
    if (totalAmount === 0) return 0; // 총 판매액이 0일 때 비중은 0
    return (amount / totalAmount) * 100;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(startDate, endDate);
        const response = await fetchProductSales({ startDate: startDate, endDate: endDate });
        const { productStatistics, totalAmount } = response;

        setTotalAmount(totalAmount);

        const processedData = productStatistics.map((rowData) => ({
          productName: rowData.productName,
          productImage: rowData.imageUrl || logoXD,
          quantity: rowData.quantity,
          amount: rowData.amount,
        }));

        setRowDatas(processedData); // 상태 업데이트
      } catch (error) {
        console.error("Failed to fetch product sales", error);
      }
    };

    fetchData();
  }, [startDate, endDate, refreshKey]);

  return {
    columns: [
      { Header: "상품", accessor: "product", width: "45%", align: "left" },
      { Header: "판매량", accessor: "quantity", width: "10%", align: "left" },
      { Header: "수익", accessor: "budget", align: "center" },
      { Header: "판매 비중", accessor: "completion", align: "center" },
    ],
    rows: rowDatas.map((rowData) => ({
      product: <Company image={rowData.productImage} name={rowData.productName} />,
      quantity: rowData.quantity,
      budget: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {rowData.amount.toLocaleString()}원
        </MDTypography>
      ),
      completion: (
        <MDBox width="8rem" textAlign="right">
          <MDProgress
            value={Math.abs(calculateCompletion(rowData.amount))} // 절대값으로 표현
            color={rowData.amount < 0 ? "error" : "info"} // 음수면 빨간색
            variant="gradient"
            label={false}
          />
          {calculateCompletion(rowData.amount).toFixed(1)}%
        </MDBox>
      ),
    })),
    totalAmount: totalAmount,
  };
}
