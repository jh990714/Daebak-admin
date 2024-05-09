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

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  const datas = [
    { categoryName: "고등어", parentCategoryName: "생선" },
    { categoryName: "삼치-조기", parentCategoryName: "생선" },
    { categoryName: "굴비", parentCategoryName: "생선" },
    { categoryName: "장어", parentCategoryName: "생선" },
    { categoryName: "돔", parentCategoryName: "생선" },
    { categoryName: "새우", parentCategoryName: "갑각" },
    { categoryName: "게", parentCategoryName: "갑각" },
    { categoryName: "낙지", parentCategoryName: "갑각" },
    { categoryName: "오징어", parentCategoryName: "갑각" },
    { categoryName: "문어", parentCategoryName: "갑각" },
    { categoryName: "전복", parentCategoryName: "조개" },
    { categoryName: "소라", parentCategoryName: "조개" },
    { categoryName: "가리비(준비중)", parentCategoryName: "조개" },
    { categoryName: "키조개(준비중)", parentCategoryName: "조개" },
    { categoryName: "새조개(준비중)", parentCategoryName: "조개" },
    { categoryName: "다시마(준비중)", parentCategoryName: "해조" },
    { categoryName: "김(준비중)", parentCategoryName: "해조" },
    { categoryName: "미역(준비중)", parentCategoryName: "해조" },
    { categoryName: "해초(준비중)", parentCategoryName: "해조" },
    { categoryName: "회(준비중)", parentCategoryName: "수산가공품" },
    { categoryName: "해산물볶음", parentCategoryName: "수산가공품" },
    { categoryName: "오징어채", parentCategoryName: "수산가공품" },
    { categoryName: "어묵", parentCategoryName: "수산가공품" },
    { categoryName: "소금염장어", parentCategoryName: "기타 수산물" },
    { categoryName: "멸치", parentCategoryName: "기타 수산물" },
    { categoryName: "냉동생선", parentCategoryName: "기타 수산물" },
  ];

  const Category = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "카테고리", accessor: "category" },
      { Header: "상위 카테고리", accessor: "parentCategory" },
    ],

    rows: datas.map((data) => ({
      category: <Category image={LogoAsana} name={data.categoryName} />,
      parentCategory: <Category image={LogoAsana} name={data.parentCategoryName} />,
    })),
  };
}
