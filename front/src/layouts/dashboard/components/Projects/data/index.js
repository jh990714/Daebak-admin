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

export default function data(date) {
  const [rowDatas, setRowDatas] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // 총 판매액 상태 추가

  const calculateCompletion = (amount) => {
    if (totalAmount === 0) return 0; // 총 판매액이 0일 때 비중은 0
    return (amount / totalAmount) * 100;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProductSales(date);
        const { productStatistics, totalAmount } = response;

        setTotalAmount(totalAmount);

        const processedData = productStatistics.map((rowData) => ({
          productName: rowData.productName,
          productImage: rowData.imageUrl || logoXD,
          quantity: rowData.quantity,
          amount: rowData.amount,
        }));

        console.log(processedData);
        setRowDatas(processedData); // 상태 업데이트
      } catch (error) {
        console.error("Failed to fetch product sales", error);
      }
    };

    if (date) {
      fetchData(); // date가 있을 때만 데이터를 요청
    }
  }, [date]); // date가 변경될 때마다 fetchData 호출

  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

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
        <MDBox width="8rem" textAlign="left">
          <MDProgress
            value={calculateCompletion(rowData.amount)}
            color="info"
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
