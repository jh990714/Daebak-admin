// /* eslint-disable react/prop-types */
// /* eslint-disable react/function-component-definition */
// /**
// =========================================================
// * Material Dashboard 2 React - v2.2.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// // @mui material components
// import Icon from "@mui/material/Icon";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import MDProgress from "components/MDProgress";

// // Images
// import LogoAsana from "assets/images/small-logos/logo-asana.svg";
// import logoGithub from "assets/images/small-logos/github.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";

// export default function data() {
//   const data = [
//     {
//       id: 2,
//       name: "생선",
//       subcategories: [
//         { id: 8, name: "고등어" },
//         { id: 9, name: "삼치-조기" },
//         { id: 10, name: "굴비" },
//         { id: 11, name: "장어" },
//         { id: 12, name: "돔" },
//       ],
//     },
//     {
//       id: 3,
//       name: "갑각",
//       subcategories: [
//         { id: 13, name: "새우" },
//         { id: 14, name: "게" },
//         { id: 15, name: "낙지" },
//         { id: 16, name: "오징어" },
//         { id: 17, name: "문어" },
//       ],
//     },
//     {
//       id: 4,
//       name: "조개",
//       subcategories: [
//         { id: 18, name: "전복" },
//         { id: 19, name: "소라" },
//         { id: 20, name: "가리비(준비중)" },
//         { id: 21, name: "키조개(준비중)" },
//         { id: 22, name: "새조개(준비중)" },
//       ],
//     },
//     {
//       id: 5,
//       name: "해조",
//       subcategories: [
//         { id: 23, name: "다시마(준비중)" },
//         { id: 24, name: "김(준비중)" },
//         { id: 25, name: "미역(준비중)" },
//         { id: 26, name: "해초(준비중)" },
//       ],
//     },
//     {
//       id: 6,
//       name: "수산가공품",
//       subcategories: [
//         { id: 27, name: "회(준비중)" },
//         { id: 28, name: "해산물볶음" },
//         { id: 29, name: "오징어채" },
//         { id: 30, name: "어묵" },
//       ],
//     },
//     {
//       id: 7,
//       name: "기타 수산물",
//       subcategories: [
//         { id: 31, name: "소금염장어" },
//         { id: 32, name: "멸치" },
//         { id: 33, name: "냉동생선" },
//       ],
//     },
//   ];

//   function createCategoryList(data) {
//     return data.map((category) => ({
//       id: category.id,
//       name: category.name,
//       subcategories: category.subcategories.map((subcategory) => ({
//         id: subcategory.id,
//         name: subcategory.name,
//       })),
//     }));
//   }

//   const categories = createCategoryList(data);

//   const groupedCategories = categories.reduce((acc, category) => {
//     const parentId = category.id.toString();
//     if (!acc[parentId]) {
//       acc[parentId] = [];
//     }
//     acc[parentId].push(category);
//     return acc;
//   }, {});
//   return {
//   };
// }
