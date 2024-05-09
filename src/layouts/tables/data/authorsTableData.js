/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const Author = ({ image, name, id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{id}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
  return {
    columns: [
      { Header: "사용자", accessor: "author", width: "25%", align: "left" },
      { Header: "이메일", accessor: "email", align: "center" },
      { Header: "휴대폰 번호", accessor: "phone", align: "center" },
      { Header: "기본 배송지", accessor: "address", align: "center" },
      { Header: "적립금", accessor: "points", align: "center" },
      { Header: "쿠폰", accessor: "coupons", align: "center" },
      { Header: "가입 일자", accessor: "employed", align: "center" },
    ],

    rows: [
      {
        author: <Author image={team2} name="이광득" id="naver_fKSc-5L4K-ZSNM" />,
        email: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            lgd789@naver.com
          </MDTypography>
        ),
        phone: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            010-3868-4281
          </MDTypography>
        ),
        address: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            전북특별자치도 군산시 시청로 17 군산시청
          </MDTypography>
        ),
        points: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            0 Points
          </MDTypography>
        ),
        coupons: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            0 개
          </MDTypography>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
      },
    ],
  };
}
