// import { useState } from "react";

// import { Menu, MenuItem, IconButton } from "@mui/material";
// import { MoreVert } from "@mui/icons-material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import MDTypography from "components/MDTypography";
// import { ResponseDialog } from "./dialog/responseDialog";
// import { renderTextLines } from "util/renderTextLines";

// export const qnaTableDataGrid = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [currentRow, setCurrentRow] = useState(null);
//   const [dialogType, setDialogType] = useState(null);

//   const handleMenuClick = (event, row) => {
//     setAnchorEl(event.currentTarget);
//     setCurrentRow(row);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setCurrentRow(null);
//     setDialogType(null);
//   };

//   const handleMenuItem = (type) => {
//     setDialogType(type);
//   };

//   const closeDialog = () => {
//     handleMenuClose();
//   };

//   const datas = [
//     {
//       id: 11, // 각 행에 고유한 식별자인 id를 추가합니다.
//       question: {
//         questionId: 11,
//         question:
//           "요리하기에도 딱 좋은 사이즈입니다. \n제가 이렇게 좋은 고등어를 이 가격에 구매할 수 있다니 정말 감사해요. \n이렇게 맛있는 고등어를 제공해주셔서 정말 감사합니다. \n포장도 꼼꼼하게 되어 있어서 안심하고 구매할 수 있었습니다. \n또한 배송이 정말 빠르고 안전하게 도착했습니다. \n다음에도 또 구매할 거예요. \n정말 만족스럽습니다. \n별 ⭐️⭐️⭐️⭐️⭐️ 다섯개 추천합니다!!^^",
//         createdAt: "2024-05-05T16:21:36.000+00:00",
//         name: "테*트",
//       },
//       answer: [
//         {
//           answerId: 4,
//           responseText: "답변입니다.1",
//           responseDate: "2024-05-05T16:22:00.000+00:00",
//         },
//         {
//           answerId: 5,
//           responseText: "답변입니다.2",
//           responseDate: "2024-05-05T16:22:00.000+00:00",
//         },
//       ],
//     },
//     {
//       id: 12, // 각 행에 고유한 식별자인 id를 추가합니다.
//       question: {
//         questionId: 12,
//         question: "새로운 질문입니다.",
//         createdAt: "2024-05-06T10:30:00.000+00:00",
//         name: "또*다",
//       },
//       answer: [],
//     },
//     {
//       id: 13, // 각 행에 고유한 식별자인 id를 추가합니다.
//       question: {
//         questionId: 13,
//         question: "질문할게요2",
//         createdAt: "2024-05-05T16:21:36.000+00:00",
//         name: "테*트",
//       },
//       answer: [
//         {
//           answerId: 6,
//           responseText: "답변입니다.3",
//           responseDate: "2024-05-05T16:22:00.000+00:00",
//         },
//         {
//           answerId: 7,
//           responseText: "답변입니다.4",
//           responseDate: "2024-05-05T16:22:00.000+00:00",
//         },
//       ],
//     },
//   ];

//   const { completedQna, missingQna } = datas.reduce(
//     (acc, data) => {
//       if (data.answer.length > 0) {
//         acc.completedQna.push(data);
//       } else {
//         acc.missingQna.push(data);
//       }
//       return acc;
//     },
//     { completedQna: [], missingQna: [] }
//   );

//   const columns = [
//     {
//       field: "id",
//       headerName: "질문번호",
//       width: 100,
//       renderCell: (params) => (
//         <MDTypography variant="caption" color="text" fontWeight="medium">
//           {params.row.question.questionId}
//         </MDTypography>
//       ),
//     },
//     {
//       field: "memberId",
//       headerName: "아이디",
//       width: 150,
//       renderCell: (params) => (
//         <MDTypography variant="caption" color="text" fontWeight="medium">
//           {params.row.question.name}
//         </MDTypography>
//       ),
//     },
//     {
//       field: "question",
//       headerName: "질문",
//       width: 600,
//       renderCell: (params) => (
//         <MDTypography variant="caption" color="text" fontWeight="medium">
//           <div style={{ padding: "10px 0", maxHeight: "100px", overflowY: "auto" }}>
//             {renderTextLines(params.row.question.question)}
//           </div>
//         </MDTypography>
//       ),
//     },
//     {
//       field: "answer",
//       headerName: "답변",
//       width: 600,
//       renderCell: (params) => (
//         <MDTypography variant="caption" color="text" fontWeight="medium">
//           <div style={{ padding: "10px 0", maxHeight: "100px", overflowY: "auto" }}>
//             {params.row.answer.length > 0
//               ? renderTextLines(params.row.answer[0].responseText)
//               : "No answer"}
//           </div>
//         </MDTypography>
//       ),
//     },
//     {
//       field: "action",
//       headerName: "Action",
//       width: 100,
//       renderCell: (params) => (
//         <>
//           <IconButton
//             aria-label="more"
//             aria-controls={`menu-${params.row.id}`}
//             aria-haspopup="true"
//             onClick={(event) => handleMenuClick(event, params.row)}
//           >
//             <MoreVert />
//           </IconButton>
//           <Menu
//             id={`menu-${params.row.id}`}
//             anchorEl={anchorEl}
//             keepMounted
//             open={Boolean(anchorEl && currentRow?.id === params.row.id)}
//             onClose={handleMenuClose}
//           >
//             <MenuItem onClick={() => handleMenuItem("detail")}>상세보기</MenuItem>
//             <MenuItem onClick={() => handleMenuItem("response")}>답변달기</MenuItem>
//             <MenuItem onClick={() => handleMenuItem("delete")}>삭제</MenuItem>
//           </Menu>

//           {dialogType === "response" && currentRow?.id === params.row.id && (
//             <ResponseDialog
//               rowData={currentRow}
//               setRowData={setCurrentRow}
//               isOpen={Boolean(dialogType === "response")}
//               onClose={closeDialog}
//             />
//           )}
//         </>
//       ),
//     },
//   ];

//   return {
//     columns: columns,
//     rows: completedQna,
//     missingColumns: columns,
//     missingRows: missingQna,
//   };
// };
