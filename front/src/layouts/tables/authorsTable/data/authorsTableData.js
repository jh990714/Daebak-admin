import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import team2 from "assets/images/team-2.jpg";
import { UserInfoEditDialog } from "../dialog/userInfoEditDialog";
import { UserCouponDialog } from "../dialog/userCouponDialog";
import { useSelector } from "react-redux";
import { AddPointsDialog } from "../dialog/addPointsDialog";

export default function authorsTableData() {
  const { members } = useSelector((state) => state.members);

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

  Author.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  const [dialogState, setDialogState] = useState({}); // dialog 상태를 object로 관리
  const [rowData, setRowData] = useState(members[0]);
  const [anchorEls, setAnchorEls] = useState(Array(members.length).fill(null));

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
    setRowData(members[index]);
  };

  const handleClose = () => {
    setAnchorEls(Array(members.length).fill(null));
  };

  const handleDialog = (type, index) => {
    setDialogState((prevState) => ({
      ...prevState,
      [members[index].id]: type, // id를 키로 사용하여 다이얼로그 상태 관리
    }));
    handleClose();
  };

  const handleDialogClose = (index) => {
    setDialogState((prevState) => ({
      ...prevState,
      [members[index].id]: null,
    }));
  };

  const dataColumns = [
    { Header: "사용자", accessor: "author", align: "left" },
    { Header: "이메일", accessor: "email", align: "left" },
    { Header: "휴대폰 번호", accessor: "phone", align: "left" },
    { Header: "기본 배송지", accessor: "address", align: "left" },
    { Header: "적립금", accessor: "points", align: "center" },
    { Header: "쿠폰", accessor: "coupons", align: "left" },
    { Header: "가입 일자", accessor: "employed", align: "left" },
    { Header: "Action", accessor: "action", align: "left" },
  ];

  const dataRows = useMemo(() => {
    return members.map((data, index) => ({
      id: data.id,
      author: <Author image={team2} name={data.name} id={data.id} />,
      email: data.email,
      phone: data.phone,
      address: data.address,
      points: `${data.points.toLocaleString()}원`,
      coupons: `${data.memberCoupons.length}개`,
      employed: new Date(data.employed).toLocaleString(),
      action: (
        <>
          <IconButton aria-label="more" onClick={(e) => handleClick(e, index)}>
            <MoreVert />
          </IconButton>
          <Menu anchorEl={anchorEls[index]} open={Boolean(anchorEls[index])} onClose={handleClose}>
            <MenuItem onClick={() => handleDialog("edit", index)}>수정</MenuItem>
            <MenuItem onClick={() => handleDialog("coupon", index)}>보유 쿠폰</MenuItem>
            <MenuItem onClick={() => handleDialog("points", index)}>적립금 추가</MenuItem>
            <MenuItem onClick={() => handleDialog("delete", index)}>삭제</MenuItem>
          </Menu>
          {dialogState[data.id] === "coupon" && (
            <UserCouponDialog
              rowData={data}
              setRowData={setRowData}
              isOpen={dialogState[data.id] === "coupon"}
              onClose={() => handleDialogClose(index)}
            />
          )}
          {dialogState[data.id] === "edit" && (
            <UserInfoEditDialog
              rowData={data}
              setRowData={setRowData}
              isOpen={dialogState[data.id] === "edit"}
              onClose={() => handleDialogClose(index)}
            />
          )}
          {dialogState[data.id] === "points" && (
            <AddPointsDialog
              selectMembers={[data]}
              isOpen={dialogState[data.id] === "points"}
              onClose={() => handleDialogClose(index)}
            />
          )}
        </>
      ),
    }));
  }, [members, anchorEls, dialogState]);

  return {
    dataColumns,
    dataRows,
  };
}
