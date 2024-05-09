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
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  // const parentCategories = [
  //   { id: "2", categoryName: "생선" },
  //   { id: "3", categoryName: "갑각" },
  //   { id: "4", categoryName: "조개" },
  //   { id: "5", categoryName: "해조" },
  //   { id: "6", categoryName: "수산가공품" },
  //   { id: "7", categoryName: "기타수산물" },
  // ];

  const categories = [
    { id: "2", categoryName: "생선", parentId: null },
    { id: "3", categoryName: "갑각", parentId: null },
    { id: "4", categoryName: "조개", parentId: null },
    { id: "5", categoryName: "해조", parentId: null },
    { id: "6", categoryName: "수산가공품", parentId: null },
    { id: "7", categoryName: "기타수산물", parentId: null },
    { id: "8", categoryName: "고등어", parentId: 2 },
    { id: "9", categoryName: "삼치-조기", parentId: 2 },
    { id: "10", categoryName: "굴비", parentId: 2 },
    { id: "11", categoryName: "장어", parentId: 2 },
    { id: "12", categoryName: "돔", parentId: 2 },
    { id: "13", categoryName: "새우", parentId: 3 },
    { id: "14", categoryName: "게", parentId: 3 },
    { id: "15", categoryName: "낙지", parentId: 3 },
    { id: "16", categoryName: "오징어", parentId: 3 },
    { id: "17", categoryName: "문어", parentId: 3 },
    { id: "18", categoryName: "전복", parentId: 4 },
    { id: "19", categoryName: "소라", parentId: 4 },
    { id: "20", categoryName: "가리비(준비중)", parentId: 4 },
    { id: "21", categoryName: "키조개(준비중)", parentId: 4 },
    { id: "22", categoryName: "새조개(준비중)", parentId: 4 },
    { id: "23", categoryName: "다시마(준비중)", parentId: 5 },
    { id: "24", categoryName: "김(준비중)", parentId: 5 },
    { id: "25", categoryName: "미역(준비중)", parentId: 5 },
    { id: "26", categoryName: "해초(준비중)", parentId: 5 },
    { id: "27", categoryName: "회(준비중)", parentId: 6 },
    { id: "28", categoryName: "해산물볶음", parentId: 6 },
    { id: "29", categoryName: "오징어채", parentId: 6 },
    { id: "30", categoryName: "어묵", parentId: 6 },
    { id: "31", categoryName: "소금염장어", parentId: 7 },
    { id: "32", categoryName: "멸치", parentId: 7 },
    { id: "33", categoryName: "냉동생선", parentId: 7 },
  ];

  const groupedCategories = categories.reduce((acc, category) => {
    const parentId = category.parentId || "null";
    if (!acc[parentId]) {
      acc[parentId] = [];
    }
    acc[parentId].push(category);
    return acc;
  }, {});

  const Category = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  // const Progress = ({ color, value }) => (
  //   <MDBox display="flex" alignItems="center">
  //     <MDTypography variant="caption" color="text" fontWeight="medium">
  //       {value}%
  //     </MDTypography>
  //     <MDBox ml={0.5} width="9rem">
  //       <MDProgress variant="gradient" color={color} value={value} />
  //     </MDBox>
  //   </MDBox>
  // );
  const filteredCategories = categories.filter((category) => category.parentId === null);
  return {
    columns: categories
      .filter((category) => category.parentId === null)
      .map((category) => ({
        Header: category.categoryName,
        accessor: category.id,
        align: "left",
      })),

    rows: (() => {
      const rrows = [];
      for (const key in groupedCategories) {
        const row = {};
        groupedCategories[key].forEach((category, index) => {
          row[key] = (
            <MDTypography
              key={category.id}
              component="a"
              href="#"
              variant="button"
              color="text"
              fontWeight="medium"
            >
              {category.categoryName}
              <br />
            </MDTypography>
          );
        });
        rrows.push(row);
      }
      return rrows;
    })(),
    // rows: categories
    //   .filter((category) => category.parentId !== null)
    //   .map((category) => ({
    //     [category.parentId]: <Category image={LogoAsana} name={category.categoryName} />,
    //   })),
  };
}
